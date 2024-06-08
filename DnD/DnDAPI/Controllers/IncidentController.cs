using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class IncidentController : ControllerBase
  {
    private readonly IincidentStatusRepos _incedentStatusRepos;
    private readonly IincidentRepos _incedentRepos;
    private readonly AppDbContext _appDbContext;

    public IncidentController(IincidentStatusRepos incedentStatusRepos, IincidentRepos incedentRepos, AppDbContext appDbContext)
    {
      _incedentStatusRepos = incedentStatusRepos;
      _incedentRepos = incedentRepos;
      _appDbContext = appDbContext;
    }

    [HttpPost]
    [Route("addIncident")]
    public async Task<IActionResult> PostIncident(IncidentView incedent)
    {
      var newIncedent = new Incident
      {
        Location = incedent.Location,
        Date = incedent.Date,
        Description = incedent.Description,
        IncidentStatusId = incedent.IncidentStatus_ID,
        DriverUserId = incedent.DriverUser_ID,
        ResolveMethod = "",
      };
      try
      {
        _incedentRepos.Add(newIncedent);
        await _incedentRepos.SaveChangesAsync();
        return Ok();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }
    }

    [HttpDelete]
    [Route("deleteIncident")]
    public async Task<IActionResult> DeleteIncident(int id)
    {

      try
      {
        var existingIncident = await _incedentRepos.GetIncidentbyID(id);

        if (existingIncident != null)
        {
          _incedentRepos.Delete(existingIncident);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }


        if (await _incedentRepos.SaveChangesAsync())
        {
          return Ok(existingIncident);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }


    [HttpGet]
    [Route("getAllIncident")]
    public async Task<IActionResult> GetAllIncident()
    {
      try
      {
        var results = await _incedentRepos.GetAllIncidentAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getIncident")]
    public async Task<IActionResult> GetIncident(int id)
    {
      try
      {
        var results = await _incedentRepos.GetIncidentbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateIncident")]
    public async Task<IActionResult> UpdateIncident(int id, IncidentView incedent)
    {
      try
      {
        var existingIncident = await _incedentRepos.GetIncidentbyID(id);

        if (existingIncident == null) return NotFound("Could not find the Vehicle");

        existingIncident.Location = incedent.Location;
        existingIncident.Date = incedent.Date;
        existingIncident.Description = incedent.Description;
        existingIncident.IncidentStatusId = incedent.IncidentStatus_ID;
        existingIncident.ResolveMethod = incedent.ResolveMethod;


        if (await _incedentRepos.SaveChangesAsync())
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
    [Route("addIncidentStatus")]
    public async Task<IActionResult> PostIncidentStatus(IncidentStatusView incedentstatus)
    {
      var newIncedentStatus = new IncidentStatus
      {
        Status = incedentstatus.Status,
      };
      try
      {
        _incedentStatusRepos.Add(newIncedentStatus);
        await _incedentStatusRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteIncidentStatus")]
    public async Task<IActionResult> DeleteIncidentStatus(int id)
    {

      try
      {
        var existingIncidentStatus = await _incedentStatusRepos.GetIncidentStatusbyID(id);

        if (existingIncidentStatus != null)
        {
          _incedentStatusRepos.Delete(existingIncidentStatus);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }


        if (await _incedentStatusRepos.SaveChangesAsync())
        {
          return Ok(existingIncidentStatus);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }


    [HttpGet]
    [Route("getAllIncidentStatus")]
    public async Task<IActionResult> GetAllIncidentStatus()
    {
      try
      {
        var results = await _incedentStatusRepos.GetAllIncidentStatusAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getIncidentStatus")]
    public async Task<IActionResult> GetIncidentStatus(int id)
    {
      try
      {
        var results = await _incedentStatusRepos.GetIncidentStatusbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateIncidentStatus")]
    public async Task<IActionResult> UpdateIncedentStatus(int id, IncidentStatusView incedentStatus)
    {
      try
      {
        var existingIncidentStatus = await _incedentStatusRepos.GetIncidentStatusbyID(id);

        if (existingIncidentStatus == null) return NotFound("Could not find the Vehicle");

        existingIncidentStatus.Status = incedentStatus.Status;
  


        if (await _incedentStatusRepos.SaveChangesAsync())
        {
          return Ok(existingIncidentStatus);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpGet]
    [Route("getDriverIncident")]
    public async Task<IActionResult> GetDriverIncident(string id)
    {
      try
      {
        var results = await _incedentRepos.GetAllIncidentAsync();
        var incidents = _appDbContext.Incident.ToList().Where(x => x.DriverUserId == id);
      
        return Ok(incidents);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }
  }
}
