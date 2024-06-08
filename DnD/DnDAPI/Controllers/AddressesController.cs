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
  public class AddressesController : ControllerBase
  {
    private readonly IaddressRepos _addressRepos;

    public AddressesController(IaddressRepos addressRepos)
    {
      _addressRepos = addressRepos;
    }

    [HttpGet]
    [Route("getAddressById")]
    public async Task<IActionResult> getAddressById(int id)
    {
      try
      {
        var results = await _addressRepos.GetAddressbyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("getLatestAddressID")]
    public IActionResult getLatestAddressID()
    {
      try
      {
        var results =  _addressRepos.GetLatestAddressID();
        return Ok(results.AddressId);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateAddress")]
    public async Task<IActionResult> PutAddress(int id, AddressView address)
    {
      try
      {
        var existingAddress = await _addressRepos.GetAddressbyID(id);

        if (existingAddress == null) return NotFound("Could not find the Address linked to this company profile.");

        existingAddress.PostalCode = address.PostalCode;

        if (await _addressRepos.SaveChangesAsync())
        {
          return Ok(address);
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addAddress")]
    public async Task<IActionResult> PostAddress(AddressView address)
    {
      var addAddress = new Address
      {
        PostalCode = address.PostalCode,
        StreetId = address.StreetId
      };
      try
      {
        _addressRepos.Add(addAddress);
        await _addressRepos.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return Ok("Yes");
    }

    [HttpDelete]
    [Route("deleteAddress")]
    public async Task<IActionResult> DeleteAddress(int id)
    {
      try
      {
        var existingAddress = await _addressRepos.GetAddressbyID(id);

        if (existingAddress == null) return NotFound();

        _addressRepos.Delete(existingAddress);

        if (await _addressRepos.SaveChangesAsync())
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
