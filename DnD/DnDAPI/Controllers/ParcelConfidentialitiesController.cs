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
  public class ParcelConfidentialitiesController : ControllerBase
  {
    private readonly IparcelConfidentRepos _parcelConfidentRepos;

    public ParcelConfidentialitiesController(IparcelConfidentRepos parcelConfidentRepos)
    {
      _parcelConfidentRepos = parcelConfidentRepos;
    }

    [HttpGet]
    [Route("getParcelConfident")]
    public async Task<IActionResult> GetParcel(int id)
    {
      try
      {
        var results = await _parcelConfidentRepos.GetParcelconfidentialitybyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllParcelConfident")]
    public async Task<IActionResult> GetAllParcelConfidentAsync()
    {
      try
      {
        var results = await _parcelConfidentRepos.GetAllParcelconfidentialitiesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateParcelConfident")]
    public async Task<IActionResult> PutParcelConfident(int id, ParcelConView parcelConfident)
    {
      try
      {
        var existingParcelConfident = await _parcelConfidentRepos.GetParcelconfidentialitybyID(id);

        if (existingParcelConfident == null) return NotFound("Could not find the parcel");

        existingParcelConfident.Confidentiality = parcelConfident.Confidentiality;

        if (await _parcelConfidentRepos.SaveChangesAsync())
        {
          return Ok(parcelConfident);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addParcelConfident")]
    public async Task<IActionResult> PostParcelConfident(ParcelConView parcelConfident)
    {
      var addParcelConfident = new ParcelConfidentiality
      {
        Confidentiality = parcelConfident.Confidentiality
      };
      try
      {
        _parcelConfidentRepos.Add(addParcelConfident);
        await _parcelConfidentRepos.SaveChangesAsync(); 
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteParcelConfident")]
    public async Task<IActionResult> DeleteParcelConfident(int id)
    {

      try
      {
        var existingParcelConfident = await _parcelConfidentRepos.GetParcelconfidentialitybyID(id);

        if (existingParcelConfident == null) return NotFound("Could not find the Parcel");

        _parcelConfidentRepos.Delete(existingParcelConfident);

        if (await _parcelConfidentRepos.SaveChangesAsync())
        {
          return Ok(existingParcelConfident);
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
