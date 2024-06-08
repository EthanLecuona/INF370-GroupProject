using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.ViewModels;
using DnDApi.Database;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DnDApi.Database.Repository.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly IemailRepos _emailRepos;
    private readonly AppDbContext _appDbContext;
    private static Dictionary<string, TwoFactorCode> _twoFactorCodeDictionary
            = new Dictionary<string, TwoFactorCode>();

    private static string OTP;
    private static bool OTPChecker = true;
    private readonly IdateRepos _dateRepos;

    public UserController(IemailRepos emailRepos, UserManager<AppUser> userManager, AppDbContext appDbContext, IdateRepos dateRepos)
    {
      _emailRepos = emailRepos;
      _userManager = userManager;
      _appDbContext = appDbContext;
      _dateRepos = dateRepos;
    }

    [HttpPost]
    [Route("EditUser")]
    public async Task<IActionResult> EditUser(UserView userView)
    {
      try
      {
        var userOld = await _userManager.FindByIdAsync(userView.id);
        userOld.Firstname = userView.firstname;
        userOld.Lastname = userView.lastname;
        userOld.Email = userView.email;
        userOld.PhoneNumber = userView.phoneNumber;
        userOld.Profile_Picture = userView.profile_Picture;
        await _userManager.UpdateAsync(userOld);
        return Ok("Profile updated successfully!" + userOld);

      }
      catch (Exception)
      {
        return BadRequest("Please contact support!");
      }
    }

    [HttpGet]
    [Route("GetUser")]
    public async Task<IActionResult> GetUser(string Id)
    {
      try
      {
        var user = await _userManager.FindByIdAsync(Id);
        var userView = new UserView
        {
          id = user.Id,
          firstname = user.Firstname,
          lastname = user.Lastname,
          phoneNumber = user.PhoneNumber,
          email = user.Email,
          profile_Picture = user.Profile_Picture
        };
        return Ok(userView);
      }
      catch(Exception)
      {
        return BadRequest("Could not find user");
      }
    }

    [HttpPost]
    [Route("ResetPassword")]
    public async Task<ActionResult> ResetPassword(ResetPassView RPview)
    {
      try
      {
        var user = await _userManager.FindByIdAsync(RPview.Id);

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        await _userManager.ResetPasswordAsync(user, token, RPview.Password);
        await _userManager.UpdateAsync(user);
        return Ok("Password changed successfully!");
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Contact support!");
      }
    }
    


    [HttpPost]
    [Route("ForgotPassword")]
    public async Task<ActionResult> ForgotPassword(ForgotPassView email)
    {
    
      try
      {
        var user = await _userManager.FindByEmailAsync(email.userEmail);
        if (user != null)
        {
          OTP = GenerateTwoFactorCodeFor(email.userEmail);
          var mail = new MailRequestView();
          mail.ToEmail = email.userEmail ;
          mail.Subject = "Drive n Deliver - Forgot Password";
          mail.Body = "Your OTP pin is: " + OTP;
          await _emailRepos.SendEmailAsync(mail);
          var details = new { email = email.userEmail, id = user.Id };
          return Ok(details);
        }
        else
        {
          return BadRequest("User does not exist!");
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Please contact support!");
      }
    }

    [HttpPost]
    [Route("VerifyOTP")]
    public IActionResult VerifyOTP(OTPView otp)
    {
      var validOtp = VerifyTwoFactorCodeFor(otp.userEmail, otp.otp);
      if (validOtp)
      {
        return Ok("OTP Validated!");
      }
      return StatusCode(StatusCodes.Status400BadRequest, "Invalid OTP");
    }
    



    private bool VerifyTwoFactorCodeFor(string email, string code)
      {
          TwoFactorCode twoFactorCodeFromDictionary = null;
          // find subject in dictionary
          if (_twoFactorCodeDictionary
              .TryGetValue(email, out twoFactorCodeFromDictionary))
          {
              if (twoFactorCodeFromDictionary.CanBeVerifiedUntil > DateTime.Now
                  && twoFactorCodeFromDictionary.Code == code)
              {
                  twoFactorCodeFromDictionary.IsVerified = true;
                  return true;
              }
          }
          return false;
      }


    private static string GenerateTwoFactorCodeFor(string username)
    {
      var code = GenerateOTP();

      var twoFactorCode = new TwoFactorCode(code);

      // add or overwrite code
      _twoFactorCodeDictionary[username] = twoFactorCode;

      return code;
    }

    public static string GenerateOTP()
    {
      Random rnd = new Random();
      OTP = rnd.Next(1000, 9999).ToString();
      return OTP;
    }

    [HttpGet]
    [Route("getAllUsers")]
    public object GetAllUsers()
    {
      //var users = _userManager.Users;
      var user = (from users in _appDbContext.Users
                  where users.Deactivated == false 
                  select users).ToList();

     
      return user;
    }

    [HttpPut]
    [Route("deactivateUser")]
    public async Task<IActionResult> DeactivateUser(string id)
    {
      var userOld = await _userManager.FindByIdAsync(id);
      try
      {
       
        userOld.Deactivated = true;
        await _userManager.UpdateAsync(userOld);
        return Ok("Profile updated successfully!");

      }
      catch (Exception)
      {
        return BadRequest("Please contact support!");
      }
    }

    [HttpGet]
    [Route("getDateByID")]
    public async Task<IActionResult> GetDateById()
    {
      

      var date = (from Date in _appDbContext.Date
                  join dtdv in _appDbContext.DateTimeDriverVehicle
                  on Date.ScheduleDateId equals dtdv.ScheduleDateId
                  select new
                  {
                    date = Date.Date1
                  }).ToList();  
      return Ok(date);
    }

  }
}
