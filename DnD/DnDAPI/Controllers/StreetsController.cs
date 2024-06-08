using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DnDApi.Database;
using DnDApi.ViewModels;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StreetsController : ControllerBase
  {
    private readonly IstreetRepos _streetRepos;

    public StreetsController(IstreetRepos streetRepos)
    {
      _streetRepos = streetRepos;
    }

    [HttpGet]
    [Route("getStreetById")]
    public async Task<IActionResult> getStreetById(int id)
    {
      try
      {
        var results = await _streetRepos.GetStreetbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getLatestStreetID")]
    public IActionResult getLatestStreetID()
    {
      try
      {
        var results =  _streetRepos.GetLatestStreetID();
        return Ok(results.StreetId);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateStreet")]
    public async Task<IActionResult> PutStreet(int id, StreetView street)
    {
      try
      {
        var existingStreet = await _streetRepos.GetStreetbyID(id);

        if (existingStreet == null) return NotFound("Could not find the Street linked to this company profile.");

        existingStreet.StreetName = street.StreetName;
        existingStreet.StreetNumber = street.StreetNumber;

        if (await _streetRepos.SaveChangesAsync())
        {
          return Ok(street);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addStreet")]
    public async Task<IActionResult> PostStreet(StreetView street)
    {
      var addStreet = new Street
      {
        StreetName = street.StreetName,
        StreetNumber = street.StreetNumber,
        SuburbId = street.SuburbId
      };
      try
      {
        _streetRepos.Add(addStreet);
        await _streetRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteStreet")]
    public async Task<IActionResult> DeleteStreet(int id)
    {
      try
      {
        var existingStreet = await _streetRepos.GetStreetbyID(id);

        if (existingStreet == null) return NotFound();

        _streetRepos.Delete(existingStreet);

        if (await _streetRepos.SaveChangesAsync())
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
  }
}
