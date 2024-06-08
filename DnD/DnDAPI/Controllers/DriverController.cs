using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DriverController : ControllerBase
  {

    private readonly IratingRepos _ratingRepos;
    private readonly IlicenseCodeRepos _licenseCodeRepos;
    private readonly IlicenseRepos _licenseRepos;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly IdriverRatingRepos _driverRatingRepos;
    private readonly IdriverInformationRepos _driverInformationRepos;
    private readonly AppDbContext _appDbContext;
    private readonly IvehicleRepos _vehicleRepos;
    public DriverController(IratingRepos ratingRepos, IlicenseCodeRepos licenseCodeRepos, IlicenseRepos licenseRepos,
      RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager, IdriverRatingRepos driverRatingRepos,
      IdriverInformationRepos driverInformationRepos, AppDbContext appDbContext, IvehicleRepos vehicleRepos)
    {
      _ratingRepos = ratingRepos;
      _licenseCodeRepos = licenseCodeRepos;
      _licenseRepos = licenseRepos;
      _roleManager = roleManager;
      _userManager = userManager;
      _driverRatingRepos = driverRatingRepos;
      _driverInformationRepos = driverInformationRepos;
      _appDbContext = appDbContext;
      _vehicleRepos = vehicleRepos;
    }

    [HttpPost]
    [Route("addRating")]
    public async Task<IActionResult> PostRating(RatingView rating)
    {
      var existing = await _ratingRepos.GetRatingbyRating(rating.Rating);

      if(existing == null)
      {
        var newRating = new Rating
        {
          Rating1 = rating.Rating
        };
        try
        {
          _ratingRepos.Add(newRating);
          await _ratingRepos.SaveChangesAsync();
        }
        catch (Exception)
        {
          return BadRequest("OOPS");
        }

        return Ok("Yes");
      }
      else
      {
        return StatusCode(StatusCodes.Status403Forbidden);
      }
     
    }

    [HttpDelete]
    [Route("deleteRating")]
    public async Task<IActionResult> DeleteRating(int id)
    {

      try
      {
        var existingRating = await _ratingRepos.GetRatingbyID(id);

        if (existingRating != null)
        {
          _ratingRepos.Delete(existingRating);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }


        if (await _ratingRepos.SaveChangesAsync())
        {
          return Ok("Yes");
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }


    [HttpGet]
    [Route("getAllRating")]
    public async Task<IActionResult> GetAllRating()
    {
      try
      {
        var results = _appDbContext.Rating.OrderBy(x => x.Rating1);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getRating")]
    public async Task<IActionResult> GetRating(int id)
    {
      try
      {
        var results = await _ratingRepos.GetRatingbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getRatingByRating")]
    public async Task<IActionResult> GetRatingByRating(double id)
    {
      try
      {
        var results = await _ratingRepos.GetRatingbyRating(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }


    [HttpGet]
    [Route("getAllDriverRating")]
    public async Task<IActionResult> GetDriverAllRating()
    {
      try
      {
        var results = await _driverRatingRepos.GetAllDriverRatingAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("addLicenseCode")]
    public async Task<IActionResult> PostLicenseCode(LicenseCodeView licenseCode)
    {
      var newLicenseCode = new LicenseCode
      {
        LicenseCode1 = licenseCode.LicenseCode,
      };
      try
      {
        _licenseCodeRepos.Add(newLicenseCode);
        await _licenseCodeRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteLicenseCode")]
    public async Task<IActionResult> DeleteLicenseCode(int id)
    {

      try
      {
        var existingLicenseCode = await _licenseCodeRepos.GetLicenseCodebyID(id);

        if (existingLicenseCode != null)
        {
          _licenseCodeRepos.Delete(existingLicenseCode);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }


        if (await _licenseCodeRepos.SaveChangesAsync())
        {
          return Ok(existingLicenseCode);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }


    [HttpGet]
    [Route("getAllLicenseCode")]
    public async Task<IActionResult> GetAllLicenseCode()
    {
      try
      {
        var results = await _licenseCodeRepos.GetAllLicenseCodeAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getLicenseCode")]
    public async Task<IActionResult> GetLicensCode(int id)
    {
      try
      {
        var results = await _licenseCodeRepos.GetLicenseCodebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }


    [HttpPost]
    [Route("addLicense")]
    public async Task<IActionResult> PostLicense(LicenseView license)
    {
      var newLicense = new License
      {
        LicenseCodeId = license.LicenseCodeId,
        Description = license.Description,
        ExpirationDate = license.ExpirationDate,
        LicenseNumber = license.LicenseNumber
      };
      try
      {
        _licenseRepos.Add(newLicense);
        await _licenseRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteLicense")]
    public async Task<IActionResult> DeleteLicense(int id)
    {

      try
      {
        var existingLicense = await _licenseRepos.GetLicensebyID(id);

        if (existingLicense != null)
        {
          _licenseRepos.Delete(existingLicense);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }


        if (await _licenseRepos.SaveChangesAsync())
        {
          return Ok(existingLicense);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpDelete]
    [Route("deleteDriverInformation")]
    public async Task<IActionResult> DeleteDriverInformation(string id)
    {
      try
      {

        var existingInfo = await _driverInformationRepos.GetInfobyID(id);


        if (existingInfo != null)
        {
          var lId = await _licenseRepos.GetLicensebyID(existingInfo.LicenseId);
          var drId = await _driverRatingRepos.GetDriverRatingbyID(existingInfo.DriverRatingId);

          _driverInformationRepos.Delete(existingInfo);

          if (await _driverInformationRepos.SaveChangesAsync())
          {
             _licenseRepos.Delete(lId);

            if (await _licenseRepos.SaveChangesAsync())
            {
               _driverRatingRepos.Delete(drId);

              if (await _driverRatingRepos.SaveChangesAsync())
              {
                return Ok("Ok");
              }
            }
          }
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }


       


      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpDelete]
    [Route("deleteDriverRating")]
    public async Task<IActionResult> DeleteDriverRating(int id)
    {

      try
      {
        var existingDriverRating = await _driverRatingRepos.GetDriverRatingbyID(id);

        if (existingDriverRating != null)
        {
          _driverRatingRepos.Delete(existingDriverRating);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }


        if (await _driverRatingRepos.SaveChangesAsync())
        {
          return Ok(existingDriverRating);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpGet]
    [Route("getAllLicense")]
    public async Task<IActionResult> GetAllLicense()
    {
      try
      {
        var results = await _licenseRepos.GetAllLicenseAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getLicense")]
    public async Task<IActionResult> GetLicens(int id)
    {
      try
      {
        var results = await _licenseRepos.GetLicensebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }


    [HttpGet]
    [Route("getDrivers")]
    public object  GetDrivers()
    {
      var users = _userManager.Users;
      var driverUsers = (from user in _appDbContext.Users
                         join userRole in _appDbContext.UserRoles
                         on user.Id equals userRole.UserId
                         join role in _appDbContext.Roles
                         on userRole.RoleId equals role.Id
                         where role.Name == "driver"
                         select user).ToList();

      return (driverUsers);
    }


    [HttpPost]
    [Route("addDriverRating")]
    public async Task<IActionResult> PostDriverRating(DriverRatingView rating)
    {
      var newDriverRating = new DriverRating
      {
        RatingId = rating.RatingId,
        DriverUserId = rating.DriverUserID,
        Date = rating.Date,
      };
      try
      {
        _driverRatingRepos.Add(newDriverRating);
        await _driverRatingRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpPut]
    [Route("updateLicenseCode")]
    public async Task<IActionResult> UpdateLicenseCode(int id, LicenseCodeView code)
    {
      try
      {
        var existingCode = await _licenseCodeRepos.GetLicenseCodebyID(id);

        if (existingCode == null) return NotFound("Could not find the Vehicle");

        existingCode.LicenseCode1 = code.LicenseCode;


        if (await _licenseCodeRepos.SaveChangesAsync())
        {
          return Ok(existingCode);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPut]
    [Route("updateRating")]
    public async Task<IActionResult> UpdateRating(int id, RatingView rating)
    {
      //var checkRating = await _ratingRepos.GetRatingbyRating(rating.Rating);
      try
      {
        var existingrating = await _ratingRepos.GetRatingbyID(id);

        if (existingrating == null) return NotFound("Could not find the Rating");

        //if(checkRating == null)
        {
          existingrating.Rating1 = rating.Rating;


          if (await _ratingRepos.SaveChangesAsync())
          {
            return Ok("Yes");
          }
        }
        //else
        //{
        //  return StatusCode(StatusCodes.Status403Forbidden);
        //}
       
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPut]
    [Route("updateLicense")]
    public async Task<IActionResult> UpdateLicense(int id, LicenseView license)
    {
      try
      {
        var existingLicense = await _licenseRepos.GetLicensebyID(id);

        if (existingLicense == null) return NotFound("Could not find the Vehicle");

        existingLicense.LicenseCodeId = license.LicenseCodeId;
        existingLicense.Description = license.Description;
        existingLicense.ExpirationDate = license.ExpirationDate;
        existingLicense.LicenseNumber = license.LicenseNumber;


        if (await _licenseRepos.SaveChangesAsync())
        {
          return Ok(existingLicense);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }




    [HttpPost]
    [Route("addDriverInformation")]
    public async Task<IActionResult> PostDriverInformation(DriverInformationView info)
    {
      var lID = _licenseRepos.GetID();
      var drID = _driverRatingRepos.GetID();
      var newDriverinfo = new DriverInformation
      {
        DriverUserId = info.DriverUser_ID,
        DriverRatingId =  drID.DriverRatingId,
        LicenseId = lID.LicenseId,
        RegistrationId = info.Registration_ID,
      };


       _driverInformationRepos.Add(newDriverinfo);
      await _driverInformationRepos.SaveChangesAsync();

      return Ok("Yes");
    }

    [HttpGet]
    [Route("getDriverRatingID")]
    public object GetDriverRatingID()
    {
      try
      {
        var results = _driverRatingRepos.GetID();
        return results;
      }
      catch (Exception)
      {
        return "oops";
      }
    }

    [HttpGet]
    [Route("getLicenseID")]
    public object GetLicenseID()
    {
      try
      {
        var results = _licenseRepos.GetID();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getDriverInfo")]
    public object GetDriverInfo()
    {
      
        var driverInfo =  (from DriverInformation in _appDbContext.DriverInformation
                          join License in _appDbContext.License
                           on DriverInformation.LicenseId equals License.LicenseId
                          join DriverRating in _appDbContext.DriverRating
                          on DriverInformation.DriverRatingId equals DriverRating.DriverRatingId
                          join Rating in _appDbContext.Rating
                          on DriverRating.RatingId equals Rating.RatingId
                          join user in _appDbContext.Users
                          on DriverInformation.DriverUserId equals user.Id
                          select new
                          {
                            driverId = user.Id,
                            licenseId = License.LicenseId,
                            firstname = user.Firstname,
                            lastname = user.Lastname,
                            licenseNumber = License.LicenseNumber,
                            expDate = License.ExpirationDate,
                            driverRating = Rating.Rating1
                          }).ToList();

        return  driverInfo;
    }


    [HttpGet]
    [Route("getDriverLicense")]
    public object GetDriverLicense(string id)
    {

      var driverInfo = (from DriverInformation in _appDbContext.DriverInformation
                        join License in _appDbContext.License
                         on DriverInformation.LicenseId equals License.LicenseId
                        join DriverRating in _appDbContext.DriverRating
                        on DriverInformation.DriverRatingId equals DriverRating.DriverRatingId
                        join Rating in _appDbContext.Rating
                        on DriverRating.RatingId equals Rating.RatingId
                        join user in _appDbContext.Users
                        on DriverInformation.DriverUserId equals user.Id
                        select new
                        {
                          driverId = user.Id,
                          licenseId = License.LicenseId,
                          firstname = user.Firstname,
                          lastname = user.Lastname,
                          licenseNumber = License.LicenseNumber,
                          expDate = License.ExpirationDate,
                          driverRating = Rating.Rating1
                        }).Where(x => x.driverId == id).ToList();

      return driverInfo;
    }

    [HttpGet]
    [Route("getAllDriverInformation")]
    public async Task<IActionResult> GetDriverInformation()
    {
      try
      {
        var results = await _driverInformationRepos.GetAllDriverInformationAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getAvailableVehicles")]
    public object GetAvailableVehicles()
    {
      var vReg = _appDbContext.Vehicle.ToList();
      var dReg = _appDbContext.DriverInformation.ToList();

      List<Vehicle> vehicles;
     

      vehicles = vReg.Where(p => !dReg.Any(e => e.RegistrationId == p.RegistrationId)).ToList();

      var dID = _appDbContext.Users.ToList();
      var diID = _appDbContext.DriverInformation.ToList();

      List<AppUser> users;

      users = dID.Where(p => !diID.Any(e => e.DriverUserId != p.Id)).ToList();
      return new { avVehicles = vehicles, avDrivers = users };
      
    }

    [HttpGet]
    [Route("getAVDrivers1")]
    public object GetAVDrivers()
    {
      var users = _userManager.Users;
      var driverUsers = (from user in _appDbContext.Users
                         join userRole in _appDbContext.UserRoles
                         on user.Id equals userRole.UserId
                         join role in _appDbContext.Roles
                         on userRole.RoleId equals role.Id
                         where role.Name == "driver"
                          select user).ToList();

      var driverID = _appDbContext.DriverInformation.ToList();
      driverUsers = driverUsers.Where(p => !driverID.Any(e => e.DriverUserId == p.Id)).ToList();
      return (driverUsers);
    }


    [HttpGet]
    [Route("getDriverRatings")]
    public object GetDriverRating()
    {
      var users = _userManager.Users;
      var driverUsers = (from user in _appDbContext.Users
                         join DriverRating in _appDbContext.DriverRating
                         on user.Id equals DriverRating.DriverUserId
                         join Rating in _appDbContext.Rating
                         on DriverRating.RatingId equals Rating.RatingId
                         select new
                         {
                           driverRatingId = DriverRating.DriverRatingId,
                           ratingID = Rating.RatingId,
                           DriverUserId = user.Id,
                           firstName = user.Firstname,
                           lastName = user.Lastname,
                           rating = Rating.Rating1,
                           date = DriverRating.Date
                         }).ToList();

      
      return (driverUsers);
    }

    [HttpGet]
    [Route("getDriverRatingByID")]
    public async Task<IActionResult> GetDriverRatingByID(int id)
    {
      try
      {
        var existingRating = await _driverRatingRepos.GetDriverRatingbyID(id);

        return Ok(existingRating);
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPut]
    [Route("editDriverRating")]
    public async Task<IActionResult> EditDriverRating(int id, DriverRatingView ratingView)
    {
      try
      {
        var existingRating = await _driverRatingRepos.GetDriverRatingbyID(id);

        if(existingRating == null)
        {
          return BadRequest();
        }

        existingRating.RatingId = ratingView.RatingId;
        existingRating.Date = ratingView.Date;

        if  (await _driverRatingRepos.SaveChangesAsync())
        {
          return Ok(existingRating);
        }
        
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

  }

}

