using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BookingController : ControllerBase
  {
    private readonly IbookingStatusRepos _statusRepos;
    private readonly IbookingTypeRepos _typeRepos;
    private readonly IbookingRepos _bookingRepos;
    private readonly IparcelRepos _parcelRepos;
    private readonly AppDbContext _appDb;
    private readonly IdateRepos _dateRepos;
    private readonly ItimeRepos _timeRepos;
    private readonly IdriverScheduleRepos _driverscheduleRepos;
    private readonly IvehicleRepos _vehicleRepos;
    private readonly UserManager<AppUser> _userManager;
    private readonly AppDbContext _appDbContext;
    private readonly IdriverInformationRepos _driverInformationRepos;
    private readonly ImaintenanceRepos _maintenanceRepos;

    public BookingController(IbookingStatusRepos statusRepos, IbookingTypeRepos typeRepos, AppDbContext appDb, IbookingRepos bookingRepos, IparcelRepos parcelRepos, IdateRepos dateRepos, ItimeRepos timeRepos, IdriverScheduleRepos driversheduleRepos, IvehicleRepos vehicleRepos, UserManager<AppUser> userManager, AppDbContext appDbContext, IdriverInformationRepos driverInformationRepos, ImaintenanceRepos maintenanceRepos)
    {
      _statusRepos = statusRepos;
      _typeRepos = typeRepos;
      _dateRepos = dateRepos;
      _timeRepos = timeRepos;
      _appDb = appDb;
      _bookingRepos = bookingRepos;
      _parcelRepos = parcelRepos;
      _driverscheduleRepos = driversheduleRepos;
      _vehicleRepos = vehicleRepos;
      _userManager = userManager;
      _appDbContext = appDbContext;
      _driverInformationRepos = driverInformationRepos;
      _maintenanceRepos = maintenanceRepos;
    }

    [HttpGet]
    [Route("getStatus")]
    public async Task<IActionResult> GetStatus(int id)
    {
      try
      {
        var results = await _statusRepos.GetBookingStatusbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }
    [Authorize]
    [HttpGet]
    [Route("GetAllStatus")]
    public async Task<IActionResult> GetAllStatusAsync()
    {
      try
      {
        var results = await _statusRepos.GetAllBookingStatusAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllBookings")]
    public async Task<IActionResult> GetAllBookingsAsync()
    {
      try
      {
        var results = await _bookingRepos.GetAllBookingsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getType")]
    public async Task<IActionResult> GetType(int id)
    {
      try
      {
        var results = await _typeRepos.GetBookingTypebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllTypes")]
    public async Task<IActionResult> GetAllTypesAsync()
    {
      try
      {
        var results = await _typeRepos.GetAllBookingTypesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getParcelBooking")]
    public object getParcelBooking()
    {
      var query = (from Parcel in _appDb.Parcel
                   join parcelCon in _appDb.ParcelConfidentiality
                    on Parcel.ParcelConId equals parcelCon.ParcelConId
                   join parcelPrio in _appDb.ParcelPriority
                   on Parcel.ParcelPriorityId equals parcelPrio.ParcelPriorityId
                   join parcelType in _appDb.ParcelType
                   on Parcel.ParcelTypeId equals parcelType.ParcelTypeId
                   select new
                   {
                     parcelId = Parcel.ParcelId,
                     parcelCon = parcelCon.Confidentiality,
                     parcelPrio = parcelPrio.Priority,
                     parcelType = parcelType.Description,
                     BookingId = Parcel.BookingId
                   }).ToList();
      return query;
    }

    [HttpGet]
    [Route("getBookings")]
    public object getBookings(int cec)
    {
      var query = (from Booking in _appDb.Booking
                   join ClientEmployeeConnection in _appDb.ClientEmployeeConnection
                   on Booking.CecId equals ClientEmployeeConnection.CecId
                   join DTDV in _appDb.DateTimeDriverVehicle
                   on Booking.BookingId equals DTDV.BookingId
                   join ScheduleDate in _appDb.Date
                   on DTDV.ScheduleDateId equals ScheduleDate.ScheduleDateId
                   join CEC in _appDb.ClientEmployeeConnection
                   on Booking.CecId equals CEC.CecId
                   join User in _appDb.Users
                   on CEC.ClientUserId equals User.Id
                   select new
                   {
                     bookingId = Booking.BookingId,
                     cecId = Booking.CecId,
                     status = Booking.BookingStatus,
                     senderUserId = Booking.SenderUserId,
                     canceled = Booking.Canceled,
                     bookingDate = ScheduleDate.Date1,
                     clientName = User.Firstname + " " + User.Lastname
                   }).Where(c => c.cecId == cec);
      return query;
    }

    [HttpGet]
    [Route("getBookingById")]
    public object getBookingById(int bookingId)
    {
      var query = (from Booking in _appDb.Booking
                   join ClientEmployeeConnection in _appDb.ClientEmployeeConnection
                   on Booking.CecId equals ClientEmployeeConnection.CecId
                   select new
                   {
                     bookingId = Booking.BookingId,
                     cecId = Booking.CecId,
                     status = Booking.BookingStatus,
                     senderUserId = Booking.SenderUserId,
                     QRcode = Booking.Qrcode
                   }).Where(c => c.bookingId == bookingId).ToList();
      return query;
    }

    [HttpGet]
    [Route("getEmployeeClients")]
    public object getEmployeeClients(string UserId)
    {
      var query = (from CEC in _appDb.ClientEmployeeConnection
                   join User in _appDb.Users
                   on CEC.ClientUserId equals User.Id
                   select new
                   {
                     cecId = CEC.CecId,
                     employeeUserId = CEC.UserId,
                     clientName = User.Firstname + " " + User.Lastname,
                     clientUserId = CEC.ClientUserId
                   }).Where(c => c.employeeUserId == UserId).ToList();
      return query;
    }

    [HttpGet]
    [Route("getClientEmployee")]
    public async Task<ActionResult<object>> getClientEmployee(string ClientID)
    {
      return await _appDb.ClientEmployeeConnection.Where(c => c.ClientUserId == ClientID).ToListAsync();
    }

    [HttpGet]
    [Route("getClientCompany")]
    public object getClientCompany(string USERID)
    {
      var query = (from CEC in _appDb.ClientEmployeeConnection
                   join clientInformation in _appDb.ClientInformation
                   on CEC.ClientUserId equals clientInformation.ClientUserId
                   select new
                   {
                     clientID = CEC.ClientUserId,
                     userID = CEC.UserId,
                     companyID = clientInformation.CompanyId,
                     titleID = clientInformation.TitleId
                   }).Where(c => c.userID == USERID).ToList();
      return query;
    }

    [HttpGet]
    [Route("getCanceledDate")]
    public object getCanceledDate(int bookingId)
    {
      var query = (from Book in _appDb.Booking
                   join DTDV in _appDb.DateTimeDriverVehicle
                   on Book.BookingId equals DTDV.BookingId
                   join date in _appDb.Date
                   on DTDV.ScheduleDateId equals date.ScheduleDateId
                   join time in _appDb.Time
                   on DTDV.ScheduleTimeId equals time.ScheduleTimeId
                   select new
                   {
                     bookingId = Book.BookingId,
                     ScheduledDate = date.Date1,
                     ScheduledTime = time.Time1
                   }).Where(c => c.bookingId == bookingId).ToList();
      return query;
    }

    [HttpGet]
    [Route("getClientCompanyByClientId")]
    public object getClientCompanyByClientId(string ClientId)
    {
      var query = (from CEC in _appDb.ClientEmployeeConnection
                   join clientInformation in _appDb.ClientInformation
                   on CEC.ClientUserId equals clientInformation.ClientUserId
                   select new
                   {
                     clientID = CEC.ClientUserId,
                     userID = CEC.UserId,
                     companyID = clientInformation.CompanyId,
                     titleID = clientInformation.TitleId
                   }).Where(c => c.clientID == ClientId).ToList();
      return query;
    }

    [HttpGet]
    [Route("getDriverBookingUserId")]
    public object getDriverBookingUserId(int bookingId)
    {
      var query = (from Book in _appDb.Booking
                   join DTDV in _appDb.DateTimeDriverVehicle
                   on Book.BookingId equals DTDV.BookingId
                   select new
                   {
                     bookingId = Book.BookingId,
                     DriverUserId = DTDV.DriverUserId
                   }).Where(c => c.bookingId == bookingId).ToList();
      return query;
    }


    [HttpPost]
    [Route("createBooking")]
    public async Task<IActionResult> CreateBooking(BookingView booking)
    {
      var addBooking = new Booking
      {
        Fined = false,
        Canceled = false,
        BookingStatusId = 1,
        BookingTypeId = 1,
        Qrcode = booking.Qrcode,
        CecId = booking.CecId,
        SenderUserId = booking.SenderId
      };

      var newDate = new Date
      {
        Date1 = booking.Date
      };
      var newTime = new Time
      {
        Time1 = booking.Time,
      };

      try
      {
        _bookingRepos.Add(addBooking);
        if (await _bookingRepos.SaveChangesAsync())
        {
          var latestBooking = _bookingRepos.GetLatestAddedID();
          var addParcel = new Parcel
          {
            BookingId = latestBooking.BookingId,
            ParcelConId = booking.ParcelConId,
            ParcelPriorityId = booking.ParcelPriorityId,
            ParcelTypeId = booking.ParcelTypeId
          };
          _parcelRepos.Add(addParcel);
          if (await _parcelRepos.SaveChangesAsync())
          {
            _dateRepos.Add(newDate);
            await _dateRepos.SaveChangesAsync();
            _timeRepos.Add(newTime);
            if (await _timeRepos.SaveChangesAsync())
            {
              var addTracking = new Tracking
              {
                Distance = booking.Distance,
                StartLocation = booking.StartLocation,
                EndLocation = booking.EndLocation,
                BookingId = latestBooking.BookingId
              };
              _timeRepos.Add(addTracking);
              if (await _timeRepos.SaveChangesAsync())
              {
                await AddToSchedule();
                var auditLog = new AuditLog
                {
                  UserId = booking.SenderId,
                  AuditLogTypeId = 1,
                  TimeStamp = DateTime.UtcNow
                };
                _appDbContext.AuditLog.Add(auditLog);
                await _appDbContext.SaveChangesAsync();
              }
            }
          }
        }
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }
      return Ok("Yes");
    }

    [HttpPost]
    [Route("addToSchedule")]
    public async Task<ActionResult> AddToSchedule()
    {
      var latestBooking = _bookingRepos.GetLatestAddedID();
      var con = _parcelRepos.GetLatestAddedID();
      var bookingTime = _timeRepos.GetLatestAddedID();
      var bookingDate = _dateRepos.GetLatestAddedID();
      var bookingId = _bookingRepos.GetLatestAddedID();
      var driver = GetRandomDriver();
      var driver1 = GetRandomDriver1();
      var driver2 = GetRandomDriver2();
      var driverUser = _driverInformationRepos.GetInfobyID(driver.ToString());
      try
      {
        if (con.ParcelConId == 3)
        {
          var newDTDV = new DateTimeDriverVehicle
          {
            ScheduleTimeId = bookingTime.ScheduleTimeId,
            ScheduleDateId = bookingDate.ScheduleDateId,
            DriverUserId = driver.ToString(),
            DriverStatusId = 1,
            BookingId = bookingId.BookingId
          };

          if (newDTDV == null)
          {
            return BadRequest();
          }
          else
          {
            _driverscheduleRepos.Add(newDTDV);
            if (await _driverscheduleRepos.SaveChangesAsync())
            {
              return Ok();
            }
          }

        }

        else if (con.ParcelConId == 2)
        {
          var newDTDV = new DateTimeDriverVehicle
          {
            ScheduleTimeId = bookingTime.ScheduleTimeId,
            ScheduleDateId = bookingDate.ScheduleDateId,
            DriverUserId = driver2.ToString(),
            DriverStatusId = 1,
            BookingId = bookingId.BookingId
          };

          if (newDTDV == null)
          {
            return BadRequest();
          }
          else
          {
            _driverscheduleRepos.Add(newDTDV);
            if (await _driverscheduleRepos.SaveChangesAsync())
            {
              return Ok();
            }
          }
       

        }

        else if (con.ParcelConId == 1)
        {
          var newDTDV = new DateTimeDriverVehicle
          {
            ScheduleTimeId = bookingTime.ScheduleTimeId,
            ScheduleDateId = bookingDate.ScheduleDateId,
            DriverUserId = driver1.ToString(),
            DriverStatusId = 1,
            BookingId = bookingId.BookingId
          };

          _driverscheduleRepos.Add(newDTDV);
          if (await _driverscheduleRepos.SaveChangesAsync())
          {
            return Ok();
          }
          else
          {
            _driverscheduleRepos.Add(newDTDV);
            if (await _driverscheduleRepos.SaveChangesAsync())
            {
              return Ok();
            }
          }
        }
        
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }
      return BadRequest();
    }

    [HttpGet]
    [Route("getRandomDriver")]
    public string GetRandomDriver()
    {
      var driverUsers = _driverInformationRepos.GetAllDriverInformationAsync();

      Random random = new Random();
      int randomItem = random.Next(driverUsers.Result.Length);
      var randomElement = driverUsers.Result[randomItem];
      var id = randomElement.DriverUserId.ToString();
      var AV = randomElement.RegistrationId;

      var mainList = _maintenanceRepos.GetAllMaintenanceAsync();
      var dateID = _dateRepos.GetLatestAddedID();
      var bdate = _dateRepos.GetDatebyID(dateID.ScheduleDateId);
      var bookingdate = bdate.Result.Date1;

      DateTime? mainDate = null;

      for (var i = 0; i < mainList.Result.Length; i++)
      {
        if (mainList.Result[i].RegistrationId == AV)
        {
          mainDate = mainList.Result[i].Date;
          if (bookingdate == (mainDate.Value))
          {
            int rItem = 0;
            string rID = "";
            do
            {
              Random r = new Random();
              rItem = r.Next(driverUsers.Result.Length);
              var rElement = driverUsers.Result[rItem];
              rID = rElement.DriverUserId.ToString();
            }
            while (randomItem == rItem);

            return rID;
          }
        }
        else
        {
          return id;
        }
      }
      return id;
    }


    [HttpGet]
    [Route("getRandomDriver1")]
    public object GetRandomDriver1()
    {
      var id2 = GetRandomDriver2();
      var id3 = GetRandomDriver();
      var driverUsers = _driverInformationRepos.GetAllDriverInformationAsync();
      var drivers = driverUsers.Result.Where(x => x.DriverRatingId <= 4);
      var driv = (from drivInfo in _appDbContext.DriverInformation
                  join ratinginfo in _appDbContext.DriverRating
                  on drivInfo.DriverRatingId equals ratinginfo.DriverRatingId
                  where ratinginfo.RatingId > 7
                  select new
                  {
                    DriverUserId = drivInfo.DriverUserId,
                    ratingId = drivInfo.DriverRatingId,
                    RegistrationId = drivInfo.RegistrationId
                  }).ToList();

      if(driv.Count == 0)
      {
       
        return id2;
      }
      else if(driv.Count == 0 && id2 == null)
      {
        return id3;
      }
      else if (driv.Count > 0)
      {
        Random random = new Random();
        int randomItem = random.Next(driv.Count());
        var randomElement = driv[randomItem];
        var id = randomElement.DriverUserId.ToString();
        var AV = randomElement.RegistrationId;

        var mainList = _maintenanceRepos.GetAllMaintenanceAsync();
        var dateID = _dateRepos.GetLatestAddedID();
        var bdate = _dateRepos.GetDatebyID(dateID.ScheduleDateId);
        var bookingdate = bdate.Result.Date1;

        DateTime? mainDate = null;

        for (var i = 0; i < mainList.Result.Length; i++)
        {
          if (mainList.Result[i].RegistrationId == AV)
          {
            mainDate = mainList.Result[i].Date;
            if (bookingdate == (mainDate.Value))
            {
              int rItem = 0;
              string rID = "";
              do
              {
                Random r = new Random();
                rItem = r.Next(driv.Count());
                var rElement = driv[rItem];
                rID = rElement.DriverUserId.ToString();
              }
              while (randomItem == rItem);

              return rID;
            }
          }
          else
          {
            return id;
          }
        }
        return id;
      }

      return "";
    }

    [HttpGet]
    [Route("getRandomDriver2")]
    public object GetRandomDriver2()
    {
      var id2 = GetRandomDriver();
      var driverUsers = _driverInformationRepos.GetAllDriverInformationAsync();
      var drivers = driverUsers.Result.Where(x => x.DriverRatingId <= 4);
      var driv = (from drivInfo in _appDbContext.DriverInformation
                  join ratinginfo in _appDbContext.DriverRating
                  on drivInfo.DriverRatingId equals ratinginfo.DriverRatingId
                  where ratinginfo.RatingId > 3 && ratinginfo.RatingId <= 7
                  select new
                  {
                    DriverUserId = drivInfo.DriverUserId,
                    ratingId = drivInfo.DriverRatingId,
                    RegistrationId = drivInfo.RegistrationId
                  }).ToList();

      if (driv.Count == 0)
      {

        return id2;
      }
      else if (driv.Count > 0)
      {
        Random random = new Random();
        int randomItem = random.Next(driv.Count());
        var randomElement = driv[randomItem];
        var id = randomElement.DriverUserId.ToString();
        var AV = randomElement.RegistrationId;

        var mainList = _maintenanceRepos.GetAllMaintenanceAsync();
        var dateID = _dateRepos.GetLatestAddedID();
        var bdate = _dateRepos.GetDatebyID(dateID.ScheduleDateId);
        var bookingdate = bdate.Result.Date1;

        DateTime? mainDate = null;

        for (var i = 0; i < mainList.Result.Length; i++)
        {
          if (mainList.Result[i].RegistrationId == AV)
          {
            mainDate = mainList.Result[i].Date;
            if (bookingdate == (mainDate.Value))
            {
              int rItem = 0;
              string rID = "";
              do
              {
                Random r = new Random();
                rItem = r.Next(driv.Count());
                var rElement = driv[rItem];
                rID = rElement.DriverUserId.ToString();
              }
              while (randomItem == rItem);

              return rID;
            }
          }
          else
          {
            return id;
          }
        }
        return id;
      }
      return "";
    }
    [HttpPut]
    [Route("deleteBooking")]
    public async Task<IActionResult> deleteBooking(int bookingId, bool fined)
    {
      try
      {
        var existingSchedule = await _driverscheduleRepos.GetDateTimeDriverbyBookingID(bookingId);
        var existingBooking = await _bookingRepos.GetBookingbyID(bookingId);
        var existingTime = await _timeRepos.GetTimebyID(existingSchedule.ScheduleTimeId);
        var existingDate = await _dateRepos.GetDatebyID(existingSchedule.ScheduleDateId);
        var existingTracking = await _bookingRepos.GetTrackingByBookingId(existingBooking.BookingId);

        if (existingBooking == null || existingSchedule == null || existingTime == null || existingDate == null || existingTracking == null)
        {
          return NotFound();
        }
        _driverscheduleRepos.Delete(existingSchedule);
        if (await _driverscheduleRepos.SaveChangesAsync())
        {
          _timeRepos.Delete(existingTime);
          _dateRepos.Delete(existingDate);
          if (await _timeRepos.SaveChangesAsync())
          {
            _bookingRepos.Delete(existingTracking);
            if (await _bookingRepos.SaveChangesAsync())
            {
              if (fined == false)
              {
                existingBooking.Canceled = true;
              }
              else
              {
                existingBooking.Canceled = true;
                existingBooking.Fined = true;
              }
              if (await _bookingRepos.SaveChangesAsync())
              {
                var booking = await _appDbContext.Booking.FindAsync(existingBooking.BookingId);
                var auditLog = new AuditLog
                {
                  UserId = booking.SenderUserId,
                  AuditLogTypeId = 2,
                  TimeStamp = DateTime.UtcNow
                };
                _appDbContext.AuditLog.Add(auditLog);
                await _appDbContext.SaveChangesAsync();
                return Ok();
              }
            }
          }
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
      return BadRequest();
    }

    [HttpPost]
    [Route("addBookingCancellation")]
    public async Task<ActionResult> addBookingCancellation(CancellationView cancellation)
    {

      try
      {
        var newCancellation = new BookingCancellation
        {
          BookingId = cancellation.BookingId,
          CancelledDate = cancellation.CancelledDate,
          CancelledDescription = cancellation.CancelledDescription
        };

        _driverscheduleRepos.Add(newCancellation);
        if (await _driverscheduleRepos.SaveChangesAsync())
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

    [HttpPut]
    [Route("updateBookingStatusDriver")]
    public async Task<IActionResult> updateBookingStatusDriver(int bookingId)
    {
      try
      {
        var existingBooking = _bookingRepos.GetBookingbyID(bookingId);

        if (existingBooking == null)
        {
          return BadRequest();
        }
        existingBooking.Result.BookingStatusId = 3;
        if (await _bookingRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
      return BadRequest();
    }

    [HttpPut]
    [Route("updateBookingStatusReceiver")]
    public async Task<IActionResult> updateBookingStatusReceiver(int bookingId)
    {
      try
      {
        var existingBooking = _bookingRepos.GetBookingbyID(bookingId);

        if (existingBooking != null)
        {
          existingBooking.Result.BookingStatusId = 2;
          if (await _bookingRepos.SaveChangesAsync())
          {
            return Ok();
          }
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
      return BadRequest();
    }


  }
}
