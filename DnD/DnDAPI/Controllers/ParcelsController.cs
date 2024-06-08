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
  public class ParcelsController : ControllerBase
  {
    private readonly IparcelRepos _parcelRepos;

    public ParcelsController(IparcelRepos parcelRepos)
    {
      _parcelRepos = parcelRepos;
    }

    [HttpGet]
    [Route("getParcel")]
    public async Task<IActionResult> GetParcel(int id)
    {
      try
      {
        var results = await _parcelRepos.GetParcelbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllParcels")]
    public async Task<IActionResult> GetAllParcelsAsync()
    {
      try
      {
        var results = await _parcelRepos.GetAllParcelsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateParcels")]
    public async Task<IActionResult> PutParcel(int id, ParcelView parc)
    {
      try
      {
        var existingParcel = await _parcelRepos.GetParcelbyID(id);

        if (existingParcel == null) return NotFound("Could not find the parcel");

        existingParcel.ParcelConId = parc.ParcelConId;
        existingParcel.ParcelPriorityId = parc.ParcelPriorityId;
        existingParcel.ParcelTypeId = parc.ParcelTypeId;

        if (await _parcelRepos.SaveChangesAsync())
        {
          return Ok(parc);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addParcel")]
    public async Task<IActionResult> PostParcel(ParcelView parc)
    {
      var addParcel = new Parcel
      {
        ParcelTypeId = parc.ParcelTypeId,
        ParcelConId = parc.ParcelConId,
        ParcelPriorityId = parc.ParcelPriorityId
      };
      try
      {
        _parcelRepos.Add(addParcel);
        await _parcelRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteParcel")]
    public async Task<IActionResult> DeleteParcel(int id)
    {
 
      try
      {
        var existingParcel = await _parcelRepos.GetParcelbyID(id);

        if (existingParcel == null) return NotFound("Could not find the Vehicle");

        _parcelRepos.Delete(existingParcel);

        if (await _parcelRepos.SaveChangesAsync())
        {
          return Ok(existingParcel);
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
