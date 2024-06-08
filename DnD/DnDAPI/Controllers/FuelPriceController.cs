using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class FuelPriceController : ControllerBase
  {
    private readonly IfuelPriceRepos _fuelPriceRepos;
    private readonly AppDbContext _appDbContext;
    public FuelPriceController(IfuelPriceRepos fuelPriceRepos, AppDbContext appDbContext)
    {
      _fuelPriceRepos = fuelPriceRepos;
      _appDbContext = appDbContext;
    }

    [HttpGet]
    [Route("getFuelPrice")]
    public async Task<IActionResult> GetFuelPrice(int id)
    {
      try
      {
        var results = await _fuelPriceRepos.GetFuelPricebyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getAllFuelPrice")]
    public async Task<IActionResult> GetAllFuelPrice()
    {
      try
      {
        var results = await _fuelPriceRepos.GetAllFuelPriceAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpDelete]
    [Route("deleteFuelPrice")]
    public async Task<IActionResult> DeleteFuelPrice(int id)
    {

      try
      {
        var existingFuelPrice = await _fuelPriceRepos.GetFuelPricebyID(id);

        if (existingFuelPrice != null)
        {
          _fuelPriceRepos.Delete(existingFuelPrice);
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }



        if (await _fuelPriceRepos.SaveChangesAsync())
        {
          return Ok("YES");
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addFuelPrice")]
    public async Task<IActionResult> addVehicleModel(FuelPriceView fuel)
    {
      var addFuel = new FuelPrice
      {
        DriverUserId = fuel.DriverUser_ID,
        Litres = fuel.Liters,
        Price = fuel.Price,
        TimeStamp = fuel.TimeStamp,
        FuelSlip = fuel.FuelSlip
      };
      try
      {
        _fuelPriceRepos.Add(addFuel);
        if(await _fuelPriceRepos.SaveChangesAsync())
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


    [HttpGet]
    [Route("getDriverFuelInfo")]
    public object GetDriverInfo()
    {

      var fuelInfo = (from FuelPrice in _appDbContext.FuelPrice
                      join user in _appDbContext.Users
                      on FuelPrice.DriverUserId equals user.Id
                      select new
                      {
                        fuelID = FuelPrice.FuelPriceId,
                        firstName = user.Firstname,
                        lastName = user.Lastname,
                        driverId = FuelPrice.DriverUserId,
                        liters = FuelPrice.Litres,
                        price = FuelPrice.Price,
                        date = FuelPrice.TimeStamp
                      }).ToList();

      return fuelInfo;

    }

    [HttpGet]
    [Route("getDriverFuelPrice")]
    public async Task<IActionResult> GetDriverFuelPrice(string id)
    {
      try
      {
        var fuelInfo = await _fuelPriceRepos.GetDriverFuelPricebyID(id);

        return Ok(fuelInfo);
      }
      catch
      {
        return BadRequest();
      }
    }
  }
}
