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
  public class VehicleClassesController : ControllerBase
  {
    private readonly IvehicleClassRepos _vehicleclassRepos;
    private readonly AppDbContext _appDbContext;

    public VehicleClassesController(IvehicleClassRepos vehicleclassRepos, AppDbContext appDbContext)
    {
      _vehicleclassRepos = vehicleclassRepos;
      _appDbContext = appDbContext;
    }

    [HttpGet]
    [Route("getVehicleClass")]
    public async Task<IActionResult> GetVehicleClass(int id)
    {
      try
      {
        var results = await _vehicleclassRepos.GetVehicleClassbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllVehicleClasses")]
    public async Task<IActionResult> GetAllVehicleClassesAsync()
    {
      try
      {
        var results = _appDbContext.VehicleClass.OrderBy(x => x.Description).ToList();
      
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateVehicleClasses")]
    public async Task<IActionResult> PutVehicleClass(int id, VehicleClassView vehicleclass)
    {
      var checkClass = await _vehicleclassRepos.GetVehicleClassbyName(vehicleclass.Description);
      try
      {
        var existingVehicleClass = await _vehicleclassRepos.GetVehicleClassbyID(id);

        if (existingVehicleClass == null) return NotFound("Could not find the Company");

        if(checkClass == null)
        {
          existingVehicleClass.Description = vehicleclass.Description;

          if (await _vehicleclassRepos.SaveChangesAsync())
          {
            return Ok(vehicleclass);
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

    [HttpPost]
    [Route("addVehicleClass")]
    public async Task<IActionResult> PostVehicleClass(VehicleClassView vehicleclass)
    {
      var checkClass = await _vehicleclassRepos.GetVehicleClassbyName(vehicleclass.Description);

      if(checkClass == null)
      {
        var addVehicleClass = new VehicleClass
        {
          Description = vehicleclass.Description
        };
        try
        {
          _vehicleclassRepos.Add(addVehicleClass);
          await _vehicleclassRepos.SaveChangesAsync();
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
    [Route("deleteVehicleClass")]
    public async Task<IActionResult> DeleteVehicleClass(int id)
    {
      try
      {
        var existingVehicleClass = await _vehicleclassRepos.GetVehicleClassbyID(id);

        if (existingVehicleClass == null) return NotFound();

        _vehicleclassRepos.Delete(existingVehicleClass);

        if (await _vehicleclassRepos.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Cannot execute request.");
      }

      return BadRequest();
    }

    [HttpGet]
    [Route("getVehicleClassName")]
    public async Task<IActionResult> GetVehicleClassName(string id)
    {
      try
      {
        var results = await _vehicleclassRepos.GetVehicleClassbyName(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }
  }
}
