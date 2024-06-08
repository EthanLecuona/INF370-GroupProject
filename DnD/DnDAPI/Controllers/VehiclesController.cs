using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DnDApi.Database;
using DnDApi.ViewModels;


namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VehiclesController : ControllerBase
  {
    private readonly IvehicleRepos _vehicleRepos;
    private readonly AppDbContext _appDbContext;
    private readonly IvehicleModelRepos _vehicleModelRepos;
    private readonly IvehicleMakeRepos _vehicleMakeRepos;

    public VehiclesController(IvehicleRepos vehicleRepos, AppDbContext appDbContext, IvehicleMakeRepos vehicleMakeRepos, IvehicleModelRepos vehicleModelRepos)
    {
      _vehicleRepos = vehicleRepos;
      _appDbContext = appDbContext;
      _vehicleMakeRepos = vehicleMakeRepos;
      _vehicleModelRepos = vehicleModelRepos;
    }

    [HttpGet]
    [Route("getVehicle")]
    public async Task<IActionResult> GetVehicle(int id)
    {
      try
      {
        var results = await _vehicleRepos.GetVehiclebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllVehicles")]
    public async Task<IActionResult> GetAllVehiclesAsync()
    {
      try
      {
        var results = await _vehicleRepos.GetAllVehiclesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getAllVehiclesAndAttributes")]
    public object GetAllVehiclesAndAttributes()
    {
      var CompleteVehicleList = (from VehicleModel in _appDbContext.VehicleModel
                                        join Vehicle in _appDbContext.Vehicle
                                        on VehicleModel.ModelId equals Vehicle.ModelId
                                        join VehicleManufacturer in _appDbContext.VehicleManufacturer
                                        on Vehicle.ManufacturerId equals VehicleManufacturer.ManufacturerId
                                        join vehicleClass in _appDbContext.VehicleClass
                                        on Vehicle.VehicleClassId equals vehicleClass.VehicleClassId
                                        select new
                                        {
                                          registrationNumber = Vehicle.RegistrationNumber,
                                          classID = Vehicle.VehicleClassId,
                                          className = vehicleClass.Description,
                                          manufacturerId = VehicleManufacturer.ManufacturerId,
                                          manufacturerName = VehicleManufacturer.ManufacturerTitle,
                                          modelName = VehicleModel.ModelTitle,
                                          manufacturedDate = Vehicle.ManufacturedDate,
                                          regID = Vehicle.RegistrationId,
                                          activated = Vehicle.Activated
                                        }).ToList();

      return CompleteVehicleList;
    }
    [HttpPut]
    [Route("updateVehicles")]
    public async Task<IActionResult> PutVehicle(int id, VehicleView vehicle)
    {
      try
      {
        var existingVehicle = await _vehicleRepos.GetVehiclebyID(id);
        
        if (existingVehicle == null)
        {
          return NotFound("Could not find the Vehicle");
        }

        
          existingVehicle.RegistrationNumber = vehicle.RegistrationNumber;
          existingVehicle.ManufacturerId = vehicle.ManufacturerId;
          existingVehicle.ModelId = vehicle.ModelId;
          existingVehicle.ManufacturedDate = vehicle.ManufacturedDate;
          existingVehicle.VehicleClassId = vehicle.VehicleClassId;


        if (await _vehicleRepos.SaveChangesAsync())
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
    [Route("addVehicle")]
    public async Task<IActionResult> PostVehicle(VehicleView vehicle)
    {
      var existingVehicle = await _vehicleRepos.GetVehiclebyRegistration(vehicle.RegistrationNumber);

      if(existingVehicle == null)
      {
        var addVehicle = new Vehicle
        {

          RegistrationNumber = vehicle.RegistrationNumber,
          ManufacturerId = vehicle.ManufacturerId,
          ModelId = vehicle.ModelId,
          ManufacturedDate = vehicle.ManufacturedDate,
          VehicleClassId = vehicle.VehicleClassId,
          Activated = vehicle.Activated,
          Availability = true
        };
        try
        {
          _vehicleRepos.Add(addVehicle);
          await _vehicleRepos.SaveChangesAsync();
        }
        catch (Exception)
        {
          return BadRequest("OOPS");
        }

        return Ok();
      }
      else
      {
        return StatusCode(StatusCodes.Status403Forbidden);
      }
      
    }

    [HttpPut]
    [Route("deleteVehicle")]
   public async Task<IActionResult> DeleteVehicle(int id, bool inactive)
    {
      inactive = false;
      try
      {
        var existingVehicle = await _vehicleRepos.GetVehiclebyID(id);

        if (existingVehicle == null) return NotFound("Could not find the Vehicle");

        existingVehicle.Activated = inactive;


        if (await _vehicleRepos.SaveChangesAsync())
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
    [Route("setAvailabilityTrue")]
    public async Task<IActionResult> SetAvailabilityTrue(int id,bool avT)
    {

      if (avT == false)
      {
        try
        {
          var existingVehicle = await _vehicleRepos.GetVehiclebyID(id);

          if (existingVehicle == null) return NotFound("Could not find the Vehicle");

          existingVehicle.Availability = false;


          if (await _vehicleRepos.SaveChangesAsync())
          {
            return Ok(existingVehicle);
          }
        }
        catch (Exception)
        {
          return BadRequest("Invalid");
        }

        return Ok();
      }

      return BadRequest();
    }


    [HttpPut]
    [Route("setAvailabilityFalse")]
    public async Task<IActionResult> SetAvailabilityFalse(int id,bool avF)
    {
      if(avF == false)
      {
        try
        {
          var existingVehicle = await _vehicleRepos.GetVehiclebyID(id);

          if (existingVehicle == null) return NotFound("Could not find the Vehicle");

          existingVehicle.Availability = true;


          if (await _vehicleRepos.SaveChangesAsync())
          {
            return Ok(existingVehicle);
          }
        }
        catch (Exception)
        {
          return BadRequest("Invalid");
        }

        return Ok();
      }

      return BadRequest();
    }

    [HttpGet]
    [Route("GetAllVehicleMakes")]
    public object GetAllVehiclMakes()
    {
      var makes = _appDbContext.VehicleManufacturer.OrderBy(x => x.ManufacturerTitle).ToList();
      return makes;
    }

    [HttpGet]
    [Route("GetAllVehicleModels")]
    public object GetAllVehiclModels()
    {
      var models = _appDbContext.VehicleModel.OrderBy(x => x.ModelTitle).ToList();
      return models;
    }

    [HttpPost]
    [Route("addVehicleMake")]
    public async Task<IActionResult> addVehicleMake(VehicleMakeView vehicle)
    {
      var existing = await _vehicleMakeRepos.GetVehicleMakebyName(vehicle.ManufacturerTitle);

      if(existing == null)
      {
        var addMake = new VehicleManufacturer
        {
          ManufacturerCode = vehicle.ManufacturerCode,
          ManufacturerTitle = vehicle.ManufacturerTitle,

        };
        try
        {
          _vehicleMakeRepos.Add(addMake);
          await _vehicleMakeRepos.SaveChangesAsync();
        }
        catch (Exception)
        {
          return BadRequest("OOPS");
        }
      }
      else
      {
        return StatusCode(StatusCodes.Status403Forbidden);
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteVehicleMake")]
    public async Task<IActionResult> DeleteVehicleMake(int id)
    {
    
      try
      {
        var existingVehicle = await _vehicleMakeRepos.GetVehicleMakebyID(id);

        if (existingVehicle != null)
        {
          _vehicleMakeRepos.Delete(existingVehicle);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }
         


        if (await _vehicleMakeRepos.SaveChangesAsync())
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
    [Route("addVehicleModel")]
    public async Task<IActionResult> addVehicleModel(VehicleModelView vehicle)
    {
      var existing = await _vehicleModelRepos.GetVehicleModelbyName(vehicle.ModelTitle);

      if(existing == null)
      {
        var addModel = new VehicleModel
        {
          ManufacturerId = vehicle.Manufacturer_ID,
          ModelCode = vehicle.ModelCode,
          ModelTitle = vehicle.ModelTitle,

        };
        try
        {
          _vehicleModelRepos.Add(addModel);
          if (await _vehicleModelRepos.SaveChangesAsync())
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
      else
      {
        return StatusCode(StatusCodes.Status403Forbidden);
      }

      
    }

    [HttpDelete]
    [Route("deleteVehicleModel")]
    public async Task<IActionResult> DeleteVehicleModel(int id)
    {

      try
      {
        var existingVehicle = await _vehicleModelRepos.GetVehicleModelbyID(id);

        if (existingVehicle != null)
        {
          _vehicleModelRepos.Delete(existingVehicle);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }



        if (await _vehicleModelRepos.SaveChangesAsync())
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
    [Route("getMakeAndModel")]
    public object GetMakeAndModel()
    {
      var vehicleData = (from VehicleManufacturer in _appDbContext.VehicleManufacturer
                         join VehicleModel in _appDbContext.VehicleModel
                         on VehicleManufacturer.ManufacturerId equals VehicleModel.ManufacturerId
                         select new
                         {
                           makeTitle = VehicleManufacturer.ManufacturerTitle,
                           modelTitle = VehicleModel.ModelTitle,
                         }).OrderBy(x => x.makeTitle).ToList();

      return vehicleData;
    }

    [HttpGet]
    [Route("getVehicleModel")]
    public async Task<IActionResult> GetVehicleModel(int id)
    {
      try
      {
        var results = await _vehicleRepos.GetVehicleModelbyID(id);
        
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getVehicleModelName")]
    public async Task<IActionResult> GetVehicleModelName(string id)
    {
      try
      {
        var results = await _vehicleModelRepos.GetVehicleModelbyName(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getVehicleManufacturer")]
    public async Task<IActionResult> GetVehicleManufacturer(int id)
    {
      try
      {
        var results = await _vehicleRepos.GetVehicleManufacturerbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }

    }


    [HttpGet]
    [Route("getVehicleManufacturerByName")]
    public async Task<IActionResult> GetVehicleManufacturerByName(string id)
    {
      try
      {
        var results = await _vehicleRepos.GetVehicleManufacturerbyName(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }

    }

    [HttpGet]
    [Route("getVehicleModelByManufacturerId")]
    public async Task<IActionResult> GetModelbyManID(int id)
    {
      try
      {
        var results = await _vehicleRepos.GetVehicleModelbyManufacturerID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }


    [HttpPut]
    [Route("updateManufacturer")]
    public async Task<IActionResult> UpdateManufacturer(int id, VehicleMakeView vehicle)
    {
      try
      {
        var existingManufacturer = await _vehicleMakeRepos.GetVehicleMakebyID(id);
        

        if (existingManufacturer == null) return NotFound("Could not find the Vehicle");

          existingManufacturer.ManufacturerTitle = vehicle.ManufacturerTitle;
          existingManufacturer.ManufacturerCode = vehicle.ManufacturerCode;
          //existingVehicle.VehicleClassId = vehicle.VehicleClassId;

          if (await _vehicleMakeRepos.SaveChangesAsync())
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

    [HttpPut]
    [Route("updateModel")]
    public async Task<IActionResult> UpdateModel(int id, VehicleModelView vehicle)
    {
      try
      {
        var existingModel = await _vehicleModelRepos.GetVehicleModelbyID(id);
        var checkModel = await _vehicleModelRepos.GetVehicleModelbyName(vehicle.ModelTitle);
        if (existingModel == null) return NotFound("Could not find the Vehicle");

        if(checkModel == null)
        {
          existingModel.ManufacturerId = vehicle.Manufacturer_ID;
          existingModel.ModelTitle = vehicle.ModelTitle;
          existingModel.ModelCode = vehicle.ModelCode;
          //existingVehicle.VehicleClassId = vehicle.VehicleClassId;

          if (await _vehicleModelRepos.SaveChangesAsync())
          {
            return Ok("Yes");
          }
        }
        else
        {
          return StatusCode(StatusCodes.Status403Forbidden);
        }
        
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    //[HttpDelete]
    //[Route("deleteVehicleClass")]
    //public async Task<IActionResult> DeleteVehicleClass(int id)
    //{

    //  try
    //  {
    //    var existingVehicle = await _vehic.GetVehicleMakebyID(id);

    //    if (existingVehicle != null)
    //    {
    //      _vehicleMakeRepos.Delete(existingVehicle);
    //    }
    //    else
    //    {
    //      return NotFound("Could not find the Vehicle");
    //    }



    //    if (await _vehicleMakeRepos.SaveChangesAsync())
    //    {
    //      return Ok(existingVehicle);
    //    }
    //  }
    //  catch (Exception)
    //  {
    //    return BadRequest("Invalid");
    //  }

    //  return BadRequest();
    //}
  }
}
