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
  public class CitiesController : ControllerBase
  {
    private readonly IcityRepos _cityRepos;

    public CitiesController(IcityRepos cityRepos)
    {
      _cityRepos = cityRepos;
    }

    [HttpGet]
    [Route("GetCityById")]
    public async Task<IActionResult> GetCityById(int id)
    {
      try
      {
        var results = await _cityRepos.GetCitybyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetLatestCityID")]
    public IActionResult GetLatestCityID()
    {
      try
      {
        var results =  _cityRepos.GetLatestAddedID();
        return Ok(results.CityId);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateCity")]
    public async Task<IActionResult> PutCity(int id, CityView city)
    {
      try
      {
        var existingCity = await _cityRepos.GetCitybyID(id);

        if (existingCity == null) return NotFound("Could not find the City linked to this company profile");

        existingCity.CityName = city.CityName;

        if (await _cityRepos.SaveChangesAsync())
        {
          return Ok(city);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addCity")]
    public async Task<IActionResult> PostCity(CityView city)
    {
      var addCity = new City
      {
        CityName = city.CityName
      };
      try
      {
        _cityRepos.Add(addCity);
        await _cityRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteCity")]
    public async Task<IActionResult> DeleteCity(int id)
    {
      try
      {
        var existingCity = await _cityRepos.GetCitybyID(id);

        if (existingCity == null) return NotFound();

        _cityRepos.Delete(existingCity);

        if (await _cityRepos.SaveChangesAsync())
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
