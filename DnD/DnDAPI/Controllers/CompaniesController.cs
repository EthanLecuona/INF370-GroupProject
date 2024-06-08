using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CompaniesController : ControllerBase
  {
    private readonly IcompanyRepos _companyRepos;
    private readonly IcityRepos _cityRepos;
    private readonly IsuburbRepos _suburbRepos;
    private readonly IstreetRepos _streetRepos;
    private readonly IaddressRepos _addressRepos;
    private readonly AppDbContext _appDb;

    public CompaniesController(IcompanyRepos companyRepos, IcityRepos cityRepos, IsuburbRepos suburbRepos, IstreetRepos streetRepos, IaddressRepos addressRepos, AppDbContext appDb)
    {
      _companyRepos = companyRepos;
      _cityRepos = cityRepos;
      _suburbRepos = suburbRepos;
      _streetRepos = streetRepos;
      _addressRepos = addressRepos;
      _appDb = appDb;
    }

    [HttpGet]
    [Route("getCompany")]
    public async Task<IActionResult> GetCompany(int id)
    {
      try
      {
        var results = await _companyRepos.GetCompanybyID(id);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllActiveCompanies")]
    public async Task<IActionResult> GetAllActiveCompaniesAsync()
    {

      try
      {
        var results = _appDb.Company.Where(x => x.Activated == true);
        
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpGet]
    [Route("GetAllCompanies")]
    public async Task<IActionResult> GetAllCompaniesAsync()
    {

      try
      {
        var results = await _companyRepos.GetAllCompaniesAsync();

        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPut]
    [Route("updateCompany")]
    public async Task<IActionResult> PutCompany(int id, CompanyView company)
    {
      try
      {
        var existingCompany = await _companyRepos.GetCompanybyID(id);
        var companyName = await _companyRepos.GetCompanybyName(company.companyName);

        if (existingCompany == null)
        {
          return NotFound("Could not find the Company");
        }
        else if (companyName == null)
        {
          existingCompany.CompanyName = company.companyName;

          if (await _companyRepos.SaveChangesAsync())
          {
            return Ok(company);
          }
        }
        else return StatusCode(StatusCodes.Status403Forbidden);
       
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return BadRequest();
    }

    [HttpPost]
    [Route("addCompany")]
    public async Task<IActionResult> PostCompany(CompanyView company)
    {
      try
      {
        var addCity = new City
        {
          CityName = company.cityName
        };
        _cityRepos.Add(addCity);

        if (await _cityRepos.SaveChangesAsync())
        {
          var addSuburb = new Suburb
          {
            Suburb1 = company.suburb1,
            CityId = _cityRepos.GetLatestAddedID().CityId
          };
          _suburbRepos.Add(addSuburb);

          if (await _suburbRepos.SaveChangesAsync())
          {
            var addStreet = new Street
            {
              StreetName = company.streetName,
              StreetNumber = company.streetNumber,
              SuburbId = _suburbRepos.GetLatestSuburbID().SuburbId
            };
            _streetRepos.Add(addStreet);

            if (await _streetRepos.SaveChangesAsync())
            {
              var addAddress = new Address
              {
                PostalCode = company.postalCode,
                StreetId = _streetRepos.GetLatestStreetID().StreetId
              };
              _addressRepos.Add(addAddress);

              if (await _addressRepos.SaveChangesAsync())
              {
                var existingCompany = await _companyRepos.GetCompanybyName(company.companyName);

                if (existingCompany == null)
                {
                  var addCompany = new Company
                  {
                    CompanyName = company.companyName,
                    AddressId = _addressRepos.GetLatestAddressID().AddressId
                  };
                  _companyRepos.Add(addCompany);

                  if (await _companyRepos.SaveChangesAsync())
                  {
                    return Ok();
                  }
                }
                else
                {
                  return StatusCode(StatusCodes.Status403Forbidden);
                }
                
              }
            }
          }
        }
      }
      catch (Exception)
      {
        return BadRequest("OOPS");
      }

      return BadRequest("Outside Loop");
    }

    [HttpPut]
    [Route("deactivateCompany")]
    public async Task<IActionResult> deactivateCompany(int id)
    {
      try
      {
        var existingCompany = await _companyRepos.GetCompanybyID(id);

        if (existingCompany == null) return NotFound();

        existingCompany.Activated = false;

        if (await _companyRepos.SaveChangesAsync())
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
    [Route("checkDeactivateClient")]
    public object checkDeactivateClient(int companyID)
    {
      var query = (from comp in _appDb.Company
                   join clientinfo in _appDb.ClientInformation
                   on comp.CompanyId equals clientinfo.CompanyId
                   join CEC in _appDb.ClientEmployeeConnection
                   on clientinfo.ClientUserId equals CEC.ClientUserId
                   join book in _appDb.Booking
                   on CEC.UserId equals book.SenderUserId
                   join status in _appDb.BookingStatus
                   on book.BookingStatusId equals status.BookingStatusId
                   select new
                   {
                     bookId = book.BookingId,
                     cecId = CEC.CecId,
                     compId = comp.CompanyId,
                     status = status.Status
                   }).Where(c => c.compId == companyID && (c.status == "Placed" || c.status == "In Progress")).ToList();

      if (query.Count == 0)
      {
        return false;
      }
      else
      {
        return true;
      }
    }

    [HttpGet]
    [Route("checkDeactivateOther")]
    public object checkDeactivateOther(int companyID)
    {
      var query = (from comp in _appDb.Company
                   join clientinfo in _appDb.ClientInformation
                   on comp.CompanyId equals clientinfo.CompanyId
                   join CEC in _appDb.ClientEmployeeConnection
                   on clientinfo.ClientUserId equals CEC.ClientUserId
                   join book in _appDb.Booking
                   on CEC.ClientUserId equals book.SenderUserId
                   join status in _appDb.BookingStatus
                   on book.BookingStatusId equals status.BookingStatusId
                   select new
                   {
                     bookId = book.BookingId,
                     cecId = CEC.CecId,
                     compId = comp.CompanyId,
                     status = status.Status
                   }).Where(c => c.compId == companyID && (c.status == "Placed" || c.status == "In Progress")).ToList();
      if(query.Count == 0)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
  }
}
