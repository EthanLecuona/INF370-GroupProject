using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.Database;
using DnDApi.ViewModels;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.Threading;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ReportController : ControllerBase
  {
    private readonly AppDbContext _appContext;
    private readonly UserManager<AppUser> _userManager;
    public ReportController(AppDbContext appContext, UserManager<AppUser> userManager)
    {
      _appContext = appContext;
      _userManager = userManager;
    }


    [HttpGet]
    [Route("GetVehicleReport")]
    public object getVehicleReport()
    {
 

      var query = (
                   from Incid in _appContext.Incident
                   join DriverInfo in _appContext.DriverInformation
                   on Incid.DriverUserId equals DriverInfo.DriverUserId
                   //join Inspec in _appContext.Inspection
                   //on Incid.DriverUserId equals Inspec.DriverUserId
                   join Vehicle in _appContext.Vehicle
                   on DriverInfo.RegistrationId equals Vehicle.RegistrationId
                   join VehicleManufacturer in _appContext.VehicleManufacturer
                   on Vehicle.ManufacturerId equals VehicleManufacturer.ManufacturerId
                   join VehicleModel in _appContext.VehicleModel
                   on VehicleManufacturer.ManufacturerId equals VehicleModel.ManufacturerId
                   join Asp in _appContext.Users
                   on DriverInfo.DriverUserId equals Asp.Id
                   select new
                   {
                     //preInspectionDate = Inspec.StartDate.ToString().Substring(0, 11),
                     incidentDate = Incid.Date.ToString().Substring(0, 11),
                     IncidentLocation = Incid.Location,
                     description = Incid.Description,
                     manufacturedDate = Vehicle.ManufacturedDate,
                     registration = Vehicle.RegistrationNumber,
                     manufacturer = VehicleManufacturer.ManufacturerTitle,
                     modelTitle = VehicleModel.ModelTitle,
                     date = Incid.Date,
                     driver = Asp.Firstname + " " + Asp.Lastname,
                     status = Incid.IncidentStatusId
                     //preInspection = new { Inspec.PreCarOdometer, Inspec.PreCarTyres, Inspec.PreCarNotes },
                     //postInspection = new { Inspec.PostCarOdometer, Inspec.PostCarTyres, Inspec.PostCarNotes }
                   }

                   ).Where(c => c.status == 2).ToList();
      return query;

    }

    [HttpGet]
    [Route("GetDriverReport")]
    public object getDriverReport()
    {
      Thread.CurrentThread.CurrentCulture = new CultureInfo("nl-NL");

      var query = (from Booking in _appContext.Booking
                   join Tracking in _appContext.Tracking
                   on Booking.BookingId equals Tracking.BookingId
                   join DateTimeDriverVehicle in _appContext.DateTimeDriverVehicle
                   on Booking.BookingId equals DateTimeDriverVehicle.BookingId
                   join Driver in _appContext.DriverInformation
                   on DateTimeDriverVehicle.DriverUserId equals Driver.DriverUserId
                   join Inspection in _appContext.Inspection
                   on Driver.DriverUserId equals Inspection.DriverUserId
                   join Time in _appContext.Time
                   on DateTimeDriverVehicle.ScheduleTimeId equals Time.ScheduleTimeId
                   join Date in _appContext.Date
                   on DateTimeDriverVehicle.ScheduleDateId equals Date.ScheduleDateId
                   join Asp in _appContext.Users
                   on Driver.DriverUserId equals Asp.Id
                   select new
                   {
                     inspecDate = Inspection.EndDate.Value.ToShortDateString(),
                     actualDistance = Inspection.PostCarOdometer - Inspection.PreCarOdometer,
                     bookDate = Date.Date1.Value.ToShortDateString(),
                     distance = Tracking.Distance / 1000,
                     driver = Asp.Firstname + " " + Asp.Lastname,
                     date = Date.Date1,
                     Time = Time.Time1,
                     start = Tracking.StartLocation,
                     end = Tracking.EndLocation,
                     booking = Booking.BookingId,
                     bookingStatus = Booking.BookingStatusId
                   }).OrderBy(x => x.date).ToList();
      List<object> newList = new List<object>();
      query.ForEach(item =>
      {
        if (item.bookDate == item.inspecDate)
        {
          newList.Add(item);
        }
      });
      return newList;
    }


    [HttpGet]
    [Route("GetBookingCancelledReport")]
    public object GetBookingCancelledReport()
    {
      var query = (from BookingCancel in _appContext.BookingCancellation
                   join Book in _appContext.Booking
                   on BookingCancel.BookingId equals Book.BookingId
                   join Asp in _appContext.Users
                   on Book.SenderUserId equals Asp.Id
                   select new
                   {
                     bookingId = Book.BookingId,
                     cancelled = Book.Canceled,
                     fined = Book.Fined,
                     user = Asp.Firstname + " " + Asp.Lastname,
                     description = BookingCancel.CancelledDescription,
                     date = BookingCancel.CancelledDate
                   }).ToList();
      return query;
    }

    //[HttpGet]
    //[Route("GetAdminsCount")]
    //public object GetAdminsCount()
    //{
    //  var usersWithRoles = (from user in _appContext.Users
    //                        select new
    //                        {
    //                          UserId = user.Id,
    //                          Username = user.UserName,
    //                          Email = user.Email,
    //                          RoleNames = (from userRole in user.Roles
    //                                       join role in _appContext.Roles on userRole.RoleId
    //                                       equals role.Id
    //                                       select role.Name).ToList()
    //                        }).ToList().Select(p => new Users_in_Role_ViewModel()

    //                        {
    //                          UserId = p.UserId,
    //                          Username = p.Username,
    //                          Email = p.Email,
    //                          Role = string.Join(",", p.RoleNames)
    //                        });
    //}

    [HttpGet]
    [Route("GetBookingsInProgress")]
    public int GetBookingsInProgress()
    {
      IQueryable<Booking> query = _appContext.Booking;
      var count = query.Where(b => b.BookingStatusId == 3).Count();
      return count;
    }

    [HttpGet]
    [Route("GetBookingCompleted")]
    public int GetBookingCompleted()
    {
      IQueryable<Booking> query = _appContext.Booking;
      var count = query.Where(b => b.BookingStatusId == 2).Count();
      return count;
    }

    [HttpGet]
    [Route("GetBookingsPlaced")]
    public int GetBookingsPlaced()
    {
      IQueryable<Booking> query = _appContext.Booking;
      var count = query.Where(b => b.BookingStatusId == 1).Count();
      return count;
    }

    [HttpGet]
    [Route("GetBookingCancelCount")]
    public int GetBookingCancelCount()
    {
      IQueryable<BookingCancellation> query = _appContext.BookingCancellation;
      var count = query.Count();
      return count;
    }

    [HttpGet]
    [Route("GetIncidentCount")]
    public int GetIncidentCount()
    {
      IQueryable<Incident> query = _appContext.Incident;
      var count = query.Count();
      return count;
    }

    [HttpGet]
    [Route("GetRefuelCount")]
    public int GetRefuelCount()
    {
      IQueryable<FuelPrice> query = _appContext.FuelPrice;
      var count = query.Count();
      return count;
    }

    [HttpGet]
    [Route("GetVehicleCount")]
    public int GetVehicleCount()
    {
      IQueryable<Vehicle> query = _appContext.Vehicle;
      var count = query.Count();
      return count;
    }

    [HttpGet]
    [Route("GetTotalUsers")]
    public int GetTotalUsers()
    {
      IQueryable<AppUser> query = _appContext.Users;
      var count = query.Count();
      return count;
    }

    [HttpGet]
    [Route("GetMaintenanceCount")]
    public int GetMaintenanceCount()
    {
      IQueryable<Maintenance> query = _appContext.Maintenance;
      var count = query.Count();
      return count;
    }


    [HttpGet]
    [Route("GetMaintenanceReport")]
    public object GetMaintenanceReport()
    {
      var query = (from Maintenance in _appContext.Maintenance
                   join Mechanic in _appContext.Mechanic
                   on Maintenance.MechanicId equals Mechanic.MechanicId
                   join Vehicle in _appContext.Vehicle
                   on Maintenance.RegistrationId equals Vehicle.RegistrationId
                   join VehicleManufacturer in _appContext.VehicleManufacturer
                   on Vehicle.ManufacturerId equals VehicleManufacturer.ManufacturerId
                   join VehicleModel in _appContext.VehicleModel
                   on Vehicle.ModelId equals VehicleModel.ModelId
                   select new
                   {
                     mechanicName = Mechanic.MechanicName,
                     mechanicEmail = Mechanic.MechanicEmail,
                     serviceDate = Maintenance.Date,
                     registrationNum = Vehicle.RegistrationNumber,
                     vehicleManufacturer = VehicleManufacturer.ManufacturerTitle,
                     vehicleModel = VehicleModel.ModelTitle
                   }).ToList();
      return query;
    }

    [HttpGet]
    [Route("GetAuditLogReport")]
    public object GetAuditLogReport()
    {
      var query = (from AuditLog in _appContext.AuditLog
                   join AuditLogType in _appContext.AuditLogType
                   on AuditLog.AuditLogTypeId equals AuditLogType.AuditLogTypeId
                   join Asp in _appContext.Users
                   on AuditLog.UserId equals Asp.Id
                   select new
                   {
                     user = Asp.Firstname + " " + Asp.Lastname,
                     description = AuditLogType.Description,
                     date = AuditLog.TimeStamp
                   }).ToList();
      return query;
    }


    [HttpGet]
    [Route("GetFuelReport")]
    public object GetFuelReport()
    {
      var query = (from FuelPrice in _appContext.FuelPrice
                   join Driver in _appContext.DriverInformation
                   on FuelPrice.DriverUserId equals Driver.DriverUserId
                   join Vehicle in _appContext.Vehicle
                   on Driver.RegistrationId equals Vehicle.RegistrationId
                   join Asp in _appContext.Users
                   on Driver.DriverUserId equals Asp.Id
                   select new
                   {
                     driver = Asp.Firstname + " " + Asp.Lastname,
                     litres = FuelPrice.Litres,
                     total = FuelPrice.Price * FuelPrice.Litres,
                     price = FuelPrice.Price,
                     date = FuelPrice.TimeStamp
                   }).ToList();
      return query;
    }
  }
}
