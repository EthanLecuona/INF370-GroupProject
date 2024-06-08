using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DriverScheduleController : ControllerBase
  {
    private readonly ItimeRepos _timeRepos;
    private readonly IdateRepos _dateRepos;
    private readonly IbookingRepos _bookingRepos;
    private readonly IvehicleRepos _vehicleRepos;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly AppDbContext _appDbContext;
    private readonly IdriverScheduleRepos _driverScheduleRepos;

    public DriverScheduleController(ItimeRepos timeRepos, IdateRepos dateRepos, IbookingRepos bookingRepos, IvehicleRepos vehicleRepos,IdriverScheduleRepos driverScheduleRepos, RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager,AppDbContext appDbContext)
    {
      _timeRepos = timeRepos;
      _dateRepos = dateRepos;
      _bookingRepos = bookingRepos;
      _vehicleRepos = vehicleRepos;
      _driverScheduleRepos = driverScheduleRepos;
      _roleManager = roleManager;
      _userManager = userManager;
      _appDbContext = appDbContext;
    }

    [HttpPost]
    [Route("addToSchedule")]
    public async Task<IActionResult> AddToSchedule()
    {
      var bookingTime = _timeRepos.GetLatestAddedID();
      var bookingDate = _dateRepos.GetLatestAddedID();
      var bookingId = _bookingRepos.GetLatestAddedID();
      var VehicleList = _vehicleRepos.GetAllVehiclesAsync();

      Random random = new Random();
      var randomItem = random.Next(1, VehicleList.Result.Length);

      try
      {

        var newDTDV = new DateTimeDriverVehicle
        {
          ScheduleTimeId = bookingTime.ScheduleTimeId,
          ScheduleDateId = bookingDate.ScheduleDateId,
          DriverUserId   = randomItem.ToString(),
          DriverStatusId = 1,
          BookingId      = bookingId.BookingId
        };

        _driverScheduleRepos.Add(newDTDV);
        if (await _driverScheduleRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpGet]
    [Route("getRandomVehicle")]
    public int  GetRabdomVehicle()
    {
      var VehicleList =  _vehicleRepos.GetAllVehiclesAsync();

      Random random = new Random();
      var randomItem = random.Next(1,VehicleList.Result.Length);
    
      return (randomItem);
    }


    [HttpGet]
    [Route("getAllSchedule")]
    public async Task<IActionResult> getAllSchedule()
    {
      try
      {
        var result = await _driverScheduleRepos.GetAllDateTimeDriverAsync();
        return Ok(result);
      }
      catch (Exception)
      {
        return BadRequest();
      }

    
    }

    [HttpGet]
    [Route("getScheduleDate")]
    public async Task<IActionResult> GetScheduleDateById(int id)
    {
      try
      {
        var result = await _dateRepos.GetDatebyID(id);
        return Ok(result);
      }
      catch (Exception)
      {
        return BadRequest();
      }


    }

    [HttpGet]
    [Route("getScheduleTime")]
    public async Task<IActionResult> GetScheduleTimeById(int id)
    {
      try
      {
        var result = await _timeRepos.GetTimebyID(id);
        return Ok(result);
      }
      catch (Exception)
      {
        return BadRequest();
      }

    }

    [HttpGet]
    [Route("getScheduleDetails")]
    public object GetScheduleDetails()
    {
      var result = (from Time in _appDbContext.Time
                    join DateTimeDriverVehicle in _appDbContext.DateTimeDriverVehicle
                    on Time.ScheduleTimeId equals DateTimeDriverVehicle.ScheduleTimeId
                    join Date in _appDbContext.Date
                    on DateTimeDriverVehicle.ScheduleDateId equals Date.ScheduleDateId
                    join User in _appDbContext.Users
                    on DateTimeDriverVehicle.DriverUserId equals User.Id
                    join DriverInformation in _appDbContext.DriverInformation
                    on DateTimeDriverVehicle.DriverUserId equals DriverInformation.DriverUserId
                    join Vehicle in _appDbContext.Vehicle
                    on DriverInformation.RegistrationId equals Vehicle.RegistrationId
                    join Booking in _appDbContext.Booking
                    on DateTimeDriverVehicle.BookingId equals Booking.BookingId
                    select new
                    {
                      id = DriverInformation.DriverUserId,
                      firstname = User.Firstname,
                      lastname = User.Lastname,
                      date = Date.Date1 + " " + Time.Time1,
                      regNum = Vehicle.RegistrationNumber,
                      driver = User.Firstname,
                    }).ToList();
      //var result = (from Time in _appDbContext.Time
      //              join DateTimeDriverVehicle in _appDbContext.DateTimeDriverVehicle
      //              on Time.ScheduleTimeId equals DateTimeDriverVehicle.ScheduleTimeId
      //              join Date in _appDbContext.Date
      //              on DateTimeDriverVehicle.ScheduleDateId equals Date.ScheduleDateId
      //              join User in _appDbContext.Users
      //              on DateTimeDriverVehicle.DriverUserId equals User.Id
      //              //join Vehicle in _appDbContext.Vehicle
      //              //on DateTimeDriverVehicle.RegistrationId equals Vehicle.RegistrationId
      //              join Booking in _appDbContext.Booking
      //              on DateTimeDriverVehicle.BookingId equals Booking.BookingId
      //              select new
      //              {
      //                date = Date.Date1,
      //                time = Time.Time1,
      //                //regNum = Vehicle.RegistrationNumber,
      //                driver = User.Firstname,
      //              } ).ToList();

      return result;
    }

    [HttpGet]
    [Route("getDriverScheduleDetails")]
    public object GetDriverScheduleDetails(string id)
    {
      var result = (from Time in _appDbContext.Time
                    join DateTimeDriverVehicle in _appDbContext.DateTimeDriverVehicle
                    on Time.ScheduleTimeId equals DateTimeDriverVehicle.ScheduleTimeId
                    join Date in _appDbContext.Date
                    on DateTimeDriverVehicle.ScheduleDateId equals Date.ScheduleDateId
                    join User in _appDbContext.Users
                    on DateTimeDriverVehicle.DriverUserId equals User.Id
                    join DriverInformation in _appDbContext.DriverInformation
                    on DateTimeDriverVehicle.DriverUserId equals DriverInformation.DriverUserId
                    join Vehicle in _appDbContext.Vehicle
                    on DriverInformation.RegistrationId equals Vehicle.RegistrationId
                    join Booking in _appDbContext.Booking
                    on DateTimeDriverVehicle.BookingId equals Booking.BookingId
                    select new
                    {
                      id = DriverInformation.DriverUserId,
                      firstname = User.Firstname,
                      lastname = User.Lastname,
                      date = Date.Date1 + " " + Time.Time1,
                      regNum = Vehicle.RegistrationNumber,
                      driver = User.Firstname,
                    }).ToList();

      var driverSchedule = result.Where(a => a.id == id).ToList();
      return driverSchedule;
    }
  }
}
