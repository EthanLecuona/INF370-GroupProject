using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.ViewModels;


using DnDApi.Database;
//using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Collections.Generic;


//using System.Security.Cryptography;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  public class LoginsController : ControllerBase
  {
    //private readonly IMapper _mapper;
    private readonly AppDbContext _appDbContext;
    private readonly UserManager<AppUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<AppUser> _claimsPrincipalFactory;
    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;


    public LoginsController(UserManager<AppUser> userManager,
      IUserClaimsPrincipalFactory<AppUser> claimsPrincipalFactory,
      IConfiguration configuration,
      RoleManager<IdentityRole> roleManager,
      AppDbContext appDbContext)
    {
      _userManager = userManager;
      _claimsPrincipalFactory = claimsPrincipalFactory;
      _configuration = configuration;
      _roleManager = roleManager;
      _appDbContext = appDbContext;

      //_mapper = mapper; 
    }


    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register(LoginView login)
    {
      var user = await _userManager.FindByEmailAsync(login.UserEmail);
      if (user == null)
      {
        user = new AppUser
        {
          Id = Guid.NewGuid().ToString(),
          UserName = login.UserEmail,
          Email = login.UserEmail,
          PhoneNumber = login.PhoneNumber,
          Firstname = login.Firstname,
          Lastname = login.Lastname
        };

        var results = await _userManager.CreateAsync(user, login.UserPassword);
        if (results.Succeeded)
        {
          _userManager.AddToRoleAsync(user, "employee").Wait();
        }
        if (results.Errors.Count() > 0)
        {
          StatusCode(StatusCodes.Status500InternalServerError, "Internal error occured. Line 111");
        }
      }
      else
        return StatusCode(StatusCodes.Status403Forbidden, "Account already exists!");

      return Ok("Account created successfully!");
      //SHA256.Create(login.UserEmail);
    }

    [HttpPost]
    [Route("Login")]

    public async Task<IActionResult> Login(LoginView login)
    {
      var user = await _userManager.FindByNameAsync(login.UserEmail);
      if (user != null && await _userManager.CheckPasswordAsync(user, login.UserPassword))
      {
        try
        {
          var principal = await _claimsPrincipalFactory.CreateAsync(user);
          await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, principal);
          IList<string> roleName = await _userManager.GetRolesAsync(user);
          var details = new { role = roleName[0], id = user.Id };
          //var auditLog = new AuditLog
          //{
          //  UserId = user.Id,
          //  AuditLogTypeId = 3,
          //  TimeStamp = DateTime.UtcNow
          //};
          //_appDbContext.AuditLog.Add(auditLog);
          await _appDbContext.SaveChangesAsync();
          return Ok(details);
        }
        catch (Exception)
        {
          return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error.");
        }
      }
      else
      {
        return NotFound("User does not exist");
      }
    }

    [HttpGet]
    [Route("Logout")]
    public async Task<IActionResult> Logout(string userId)
    {
      await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
      //var auditLog = new AuditLog
      //{
      //  UserId = userId,
      //  AuditLogTypeId = 4,
      //  TimeStamp = DateTime.UtcNow
      //};
      //_appDbContext.AuditLog.Add(auditLog);
      await _appDbContext.SaveChangesAsync();
      return Ok("Successfully logged out!");
    }

    [HttpGet]
    [Route("GetAll")]
    public IEnumerable<AppUser> GetAllLogins()
    {
      return _userManager.Users;
    }

    [HttpPost]
    [Route("RegisterClient")]
    public async Task<IActionResult> RegisterClient(LoginView login)
    {
      var user = await _userManager.FindByNameAsync(login.UserEmail);
      if (user == null)
      {
        user = new AppUser
        {
          Id = Guid.NewGuid().ToString(),
          UserName = login.UserEmail,
          Email = login.UserEmail,
          PhoneNumber = login.PhoneNumber,
          Firstname = login.Firstname,
          Lastname = login.Lastname
        };

        var results = await _userManager.CreateAsync(user, login.UserPassword);
        if (results.Succeeded)
        {
          _userManager.AddToRoleAsync(user, "client").Wait();
          return Ok(user);
        }
        if (results.Errors.Count() > 0)
        {
          StatusCode(StatusCodes.Status500InternalServerError, "Internal error occured. Line 111");
        }
      }
      else
        return StatusCode(StatusCodes.Status403Forbidden, "Account already exists!");

      return Ok(user);
    }


    [HttpPost]
    [Route("RegisterDriver")]
    public async Task<IActionResult> RegisterDriver(LoginView login)
    {
      var user = await _userManager.FindByNameAsync(login.UserEmail);
      if (user == null)
      {
        user = new AppUser
        {
          Id = Guid.NewGuid().ToString(),
          UserName = login.UserEmail,
          Email = login.UserEmail,
          PhoneNumber = login.PhoneNumber,
          Firstname = login.Firstname,
          Lastname = login.Lastname
        };

        var results = await _userManager.CreateAsync(user, login.UserPassword);
        if (results.Succeeded)
        {
          _userManager.AddToRoleAsync(user, "driver").Wait();
          return Ok("");
        }
        if (results.Errors.Count() > 0)
        {
          StatusCode(StatusCodes.Status500InternalServerError, "Internal error occured. Line 111");
        }
      }
      else
        return StatusCode(StatusCodes.Status403Forbidden, "Account already exists!");

      return Ok("");
    }

    [HttpGet]
    [Route("getClientUserID")]
    public async Task<IActionResult> getClientUserID(string email)
    {
      var user = await _userManager.FindByEmailAsync(email);
      if (user == null)
      {
        return StatusCode(StatusCodes.Status404NotFound, "User not Found");
      }
      else
      {
        return Ok(user);
      };
    }

    [HttpGet]
    [Route("getUserDetailsByUsername")]
    public async Task<IActionResult> getUserDetailsByUsername(string userId)
    {
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
      {
        return StatusCode(StatusCodes.Status404NotFound, "User not Found");
      }
      else
      {
        var newUser = new
        {
          firstname = user.Firstname,
          lastname = user.Lastname,
          phoneNumber = user.PhoneNumber
        };
        return Ok(newUser);
      };
    }

  }
}
