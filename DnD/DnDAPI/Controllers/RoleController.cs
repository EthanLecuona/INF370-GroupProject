using DnDApi.Database;
using DnDApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RoleController : ControllerBase
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly AppDbContext _appDbContext;

    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager, AppDbContext appDbContext)
    {
      _roleManager = roleManager;
      _userManager = userManager;
      _appDbContext = appDbContext;
    }

    [HttpPost]
    [Route("AddRole")]
    public async Task<IActionResult> AddRole(RolesViewModel rolesViewModel)
    {
      if (ModelState.IsValid)
      {
        IdentityRole role = new IdentityRole()
        {
          Name = rolesViewModel.RoleName
        };

        IdentityResult result = await _roleManager.CreateAsync(role);

        if (result.Succeeded)
        {
          return Ok("Role Added Suc");
        }

        foreach (IdentityError error in result.Errors)
        {
          ModelState.AddModelError("", error.Description);
        }

      }

      return BadRequest(rolesViewModel);
    }

    [HttpGet]
    [Route("GetAllRoles")]
    public IActionResult GetAllRoles()
    {
      var roles = _roleManager.Roles;
      return Ok(roles);
    }

    [HttpGet]
    [Route("GetRoleById")]
    public async Task<IActionResult> GetRoleById(string Id)
    {
      var role = await _roleManager.FindByIdAsync(Id);

      if(role == null)
      {
        return BadRequest("Role not Found");
      }


      return Ok(role);
    }

    [HttpPost]
    [Route("EditRole")]
    public async Task<IActionResult> EditRole(EditRolesView model)
    {
      var role = await _roleManager.FindByIdAsync(model.RoleId);

      if (role == null)
      {
        return BadRequest("Role not Found");
      }
      else
      {
        role.Name = model.RoleName;
        var result = await _roleManager.UpdateAsync(role);

        if (result.Succeeded)
        {
          return Ok("Yes");
        }

        foreach(var error in result.Errors)
        {
          ModelState.AddModelError("", error.Description);
        }
      }

      return Ok(model);
    }

    [HttpGet]
    [Route("GetUsersInRole")]
    public async Task<IActionResult> GetUsersInRole(string roleId)
    {
      var RoleId = roleId;

      var role = await _roleManager.FindByIdAsync(roleId);

      if(role == null)
      {
        return BadRequest("Role not Found");
      }

      var model = new List<UserRolesView>();

      foreach(var user in _userManager.Users)
      {
        var userRoleView = new UserRolesView
        {
          UserId = user.Id,
          UserName = user.UserName
        };

        if (await _userManager.IsInRoleAsync(user, role.Name))
        {
          userRoleView.isSelected = true;
        }
        else
        {
          userRoleView.isSelected = false;
        }

        model.Add(userRoleView);
      }

      return Ok(model);
    }

    [HttpPost]
    [Route("AddUserToRole")]
    public async Task<IActionResult> AddUserToRole(UserRolesView model, string roleName)
    {
      var role = await _roleManager.FindByNameAsync(roleName);

      if (role == null)
      {
        return BadRequest("Role not Found");
      }

      IdentityResult result = null;

      var user = await _userManager.FindByIdAsync(model.UserId);
      var roles = await _userManager.GetRolesAsync(user);

      await _userManager.RemoveFromRolesAsync(user, roles);
        
      if (model.isSelected && !(await _userManager.IsInRoleAsync(user, role.Name)))
      {
        result = await _userManager.AddToRoleAsync(user, role.Name);
      }

      if (result.Succeeded)
      {
        return Ok();
      }

      return Ok();
    }

    [HttpGet]
    [Route("getAllEmployees")]
    public object GetAVDrivers()
    {
      var users = _userManager.Users;
      var employeeUsers = (from user in _appDbContext.Users
                         join userRole in _appDbContext.UserRoles
                         on user.Id equals userRole.UserId
                         join role in _appDbContext.Roles
                         on userRole.RoleId equals role.Id
                         where role.Name != "client"
                         select user).ToList();

      
      return (employeeUsers);
    }

    [HttpGet]
    [Route("GetRoles")]
    public IActionResult GetRoles()
    {
      var roles = (from role in _appDbContext.Roles
                  where role.Name != "client"
                  select role).ToList();
      
      return Ok(roles);
    }

    [HttpPut]
    [Route("updateRole")]
    public async Task<IActionResult> UpdateRole(string id, RolesViewModel rolesViewModel)
    {
      try
      {
        var existingRole = await _roleManager.FindByIdAsync(id);

        existingRole.Name = rolesViewModel.RoleName;

          var result = await _roleManager.UpdateAsync(existingRole);

          if (result.Succeeded)
          {
            return Ok("YES");
          }

          foreach (var error in result.Errors)
          {
            ModelState.AddModelError("", error.Description);
          }       
      }
      catch (Exception)
      {
        return BadRequest("Invalid");
      }

      return Ok();
    }

    [HttpDelete]
    [Route("deleteRole")]
    public async Task<IActionResult> DeleteRole(string id)
    {

      
        var existingRole = await _roleManager.FindByIdAsync(id);

        if (existingRole != null)
        {
         await _roleManager.DeleteAsync(existingRole);
          return Ok();
        }
        else
        {
          return NotFound("Could not find the Vehicle");
        }

    }
  }
}

