using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.Database;
using DnDApi.ViewModels;
using System.Threading.Tasks;
using System;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ParcelPrioritiesController : ControllerBase
  {
    private readonly IparcelPriorityRepos _parcelpriorityRepos;

    public ParcelPrioritiesController(IparcelPriorityRepos parcelpriorityRepos)
    {
      _parcelpriorityRepos = parcelpriorityRepos;
    }

    [HttpGet]
    [Route("getParcelPriority")]
    public async Task<IActionResult> GetParcelPriority(int id)
    {
      try
      {
        var results = await _parcelpriorityRepos.GetParcelprioritybyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllParcelPriorities")]
    public async Task<IActionResult> GetAllParcelPrioritiesAsync()
    {
      try
      {
        var results = await _parcelpriorityRepos.GetAllParcelpriorityAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateParcelPriority")]
    public async Task<IActionResult> PutParcelPriority(int id, ParcelPriorityView parcelPriority)
    {
      try
      {
        var existingParcelPriority = await _parcelpriorityRepos.GetParcelprioritybyID(id);

        if (existingParcelPriority == null) return NotFound("Could not find the parcel");

        existingParcelPriority.Priority = parcelPriority.Priority;

        if (await _parcelpriorityRepos.SaveChangesAsync())
        {
          return Ok(parcelPriority);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addParcelPriority")]
    public async Task<IActionResult> PostParcelPriority(ParcelPriorityView parcelPriority)
    {
      var addParcelPriority = new ParcelPriority
      {
        Priority = parcelPriority.Priority
      };
      try
      {
        _parcelpriorityRepos.Add(addParcelPriority);
        await _parcelpriorityRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteParcelPriority")]
    public async Task<IActionResult> DeleteParcelPriority(int id)
    {

      try
      {
        var existingParcelPriority = await _parcelpriorityRepos.GetParcelprioritybyID(id);

        if (existingParcelPriority == null) return NotFound("Could not find the Parcel");

        _parcelpriorityRepos.Delete(existingParcelPriority);

        if (await _parcelpriorityRepos.SaveChangesAsync())
        {
          return Ok(existingParcelPriority);
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
