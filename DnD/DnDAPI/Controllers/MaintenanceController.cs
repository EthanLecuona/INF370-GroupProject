using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Linq;
using Org.BouncyCastle.Ocsp;
using System.IO;
using System.Net.Sockets;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class MaintenanceController : ControllerBase
  {
    private readonly ImaintenanceRepos _maintenanceRepos;
    private readonly ImechanicRepos _mechanicRepos;
    private readonly IemailRepos _emailRepos;
    private readonly AppDbContext _appDbContext;
    private readonly IvehicleRepos _vehicleRepos;
    public MaintenanceController(ImaintenanceRepos maintenanceRepos, ImechanicRepos mechanicRepos, IemailRepos emailRepos, AppDbContext appDbContext, IvehicleRepos vehicleRepos)
    {
      _maintenanceRepos = maintenanceRepos;
      _mechanicRepos = mechanicRepos;
      _emailRepos = emailRepos;
      _appDbContext = appDbContext;
      _vehicleRepos = vehicleRepos;
    }
    [HttpGet]
    [Route("getMaintenance")]
    public async Task<IActionResult> GetMaintenance()
    {
      try
      {
        var results = await _maintenanceRepos.GetAllMaintenanceAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("addMaintenance")]
    public async Task<IActionResult> addMaintenance(MaintenanceView maintenance)
    {
      var addMaintenance = new Maintenance
      {
        Date = maintenance.Date,
        //RecordedKm = maintenance.RecordedKm,
        RegistrationId = maintenance.RegistrationId,
        MechanicId = maintenance.MechanicId,
        Confirmed = maintenance.Confirmed
      };
      try
      {
        _maintenanceRepos.Add(addMaintenance);
        if (await _maintenanceRepos.SaveChangesAsync())
        {
          return Ok("Yes");
        }
        else
        {
          return BadRequest("OOPS");
        }
        
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }


    }

    [HttpPut]
    [Route("confirmMaintenance")]
    public async Task<IActionResult> ConfirmMaintenance(int id, bool confirmed)
    {
      
      try
      {
        var existingMaitenence = await _maintenanceRepos.GetMaintenancebyID(id);

        if (existingMaitenence == null) return NotFound("Could not find the Maintenance");

        existingMaitenence.Confirmed = true;

        if (await _maintenanceRepos.SaveChangesAsync())
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

    [HttpPost]
    [Route("addMechanic")]
    public async Task<IActionResult> addMechanic(MechanicView mechanic)
    {
      var addMechanic = new Mechanic
      {
        MechanicName = mechanic.MechanicName,
        MechanicEmail = mechanic.EmailAddress,

      };
      try
      {
        var existingMechanic = await _mechanicRepos.GetMechanicbyName(mechanic.EmailAddress);
        if(existingMechanic == null)
        {
          _mechanicRepos.Add(addMechanic);
          await _mechanicRepos.SaveChangesAsync();
        }
        else
        {
          return StatusCode(StatusCodes.Status403Forbidden, "Mechanic already exists");
        }
        
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteMaintenance")]
    public async Task<IActionResult> DeleteMaintenance(int id)
    {

      try
      {
        var existingMaintenance = await _maintenanceRepos.GetMaintenancebyID(id);

        if (existingMaintenance != null)
        {
          _maintenanceRepos.Delete(existingMaintenance);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }



        if (await _maintenanceRepos.SaveChangesAsync())
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
    [Route("getMechanic")]
    public async Task<IActionResult> GetMechanic()
    {
      try
      {
        var results = await _mechanicRepos.GetAllMechanicAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpDelete]
    [Route("deleteMechanic")]
    public async Task<IActionResult> DeleteMechanic(int id)
    {

      try
      {
        var existingMechanic = await _mechanicRepos.GetMechanicbyID(id);

        if (existingMechanic != null)
        {
          _mechanicRepos.Delete(existingMechanic);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }



        if (await _mechanicRepos.SaveChangesAsync())
        {
          return Ok(existingMechanic);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }


    [HttpPost]
    [Route("sendEmail")]
    public async Task<IActionResult> SendEmail(MailRequestView request)
    {
      var newEmail = new MailRequestView()
      {
        ToEmail = request.ToEmail,
        Subject = request.Subject,
        Body = request.Body
      };
      try
      {
        await _emailRepos.SendEmailAsync(newEmail);
        return Ok();
      }
      catch (Exception)
      {
        return BadRequest();
      }
    }

    [HttpGet]
    [Route("getMaintenanceAndMechanic")]
    public object GetMaintenanceAndMechanic()
    {
      var MaintenanceAndMechanicData = (from Mechanic in _appDbContext.Mechanic
                                        join Maintenance in _appDbContext.Maintenance
                         on Mechanic.MechanicId equals Maintenance.MechanicId
                                        join Vehicle in _appDbContext.Vehicle
                                        on Maintenance.RegistrationId equals Vehicle.RegistrationId
                                        join Manufacturer in _appDbContext.VehicleManufacturer
                                        on Vehicle.ManufacturerId equals Manufacturer.ManufacturerId
                                        join Model in _appDbContext.VehicleModel
                                        on Vehicle.ModelId equals Model.ModelId
                                        select new
                                        {
                                          regNumber = Vehicle.RegistrationNumber,
                                          date = Maintenance.Date,
                                          mechanic = Mechanic.MechanicName,
                                          email = Mechanic.MechanicEmail,
                                          regID = Vehicle.RegistrationId,
                                          modelName = Model.ModelTitle,
                                          manufacturerName = Manufacturer.ManufacturerTitle,
                                          mainID = Maintenance.MaintenanceId,
                                          confirmed = Maintenance.Confirmed
                                        }).ToList();

      return MaintenanceAndMechanicData;
    }

    [HttpGet]
    [Route("getMaintenanceByID")]
    public async Task<IActionResult> GetVehicleClass(int id)
    {
      try
      {
        var results = await _maintenanceRepos.GetMaintenancebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("setAvailabilityTrue")]
    public async Task<IActionResult> setAvailability(int id, bool av)
    {
     
      //try
      {
        var existingVehicle = await _vehicleRepos.GetVehiclebyID(id);

        if (existingVehicle == null) return NotFound("Could not find the Vehicle");

        existingVehicle.Availability = av;


        if (await _vehicleRepos.SaveChangesAsync())
        {
          return Ok(existingVehicle);
        }
      }
      //catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }
  }
}
