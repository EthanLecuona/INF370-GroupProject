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
  public class ParcelTypesController : ControllerBase
  {
    private readonly IparcelTypeRepos _parcelTypeRepos;

    public ParcelTypesController(IparcelTypeRepos parcelTypeRepos)
    {
      _parcelTypeRepos = parcelTypeRepos;
    }

    [HttpGet]
    [Route("getParcelType")]
    public async Task<IActionResult> GetParcelType(int id)
    {
      try
      {
        var results = await _parcelTypeRepos.GetParceltypebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllParcelTypes")]
    public async Task<IActionResult> GetAllParcelTypesAsync()
    {
      try
      {
        var results = await _parcelTypeRepos.GetAllParceltypesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateParcelType")]
    public async Task<IActionResult> PutParcelType(int id, ParcelTypeView parcelType)
    {
      try
      {
        var existingParcelType = await _parcelTypeRepos.GetParceltypebyID(id);

        if (existingParcelType == null) return NotFound("Could not find the parcel");

        existingParcelType.Description = parcelType.Description;

        if (await _parcelTypeRepos.SaveChangesAsync())
        {
          return Ok(parcelType);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addParcelType")]
    public async Task<IActionResult> PostParcel(ParcelTypeView parcelType)
    {
      var addParcelType = new ParcelType
      {
        Description = parcelType.Description,

      };
      try
      {
        _parcelTypeRepos.Add(addParcelType);
        await _parcelTypeRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteParcelType")]
    public async Task<IActionResult> DeleteParcelType(int id)
    {

      try
      {
        var existingParcelType = await _parcelTypeRepos.GetParceltypebyID(id);

        if (existingParcelType == null) return NotFound("Could not find the Parcel");

        _parcelTypeRepos.Delete(existingParcelType);

        if (await _parcelTypeRepos.SaveChangesAsync())
        {
          return Ok(existingParcelType);
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
