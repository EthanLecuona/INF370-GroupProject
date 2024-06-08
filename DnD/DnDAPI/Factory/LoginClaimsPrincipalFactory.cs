using DnDApi.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.Factory
{
  public class LoginClaimsPrincipalFactory : UserClaimsPrincipalFactory<AppUser, IdentityRole>
  {
    public LoginClaimsPrincipalFactory(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<IdentityOptions> optionsAccesor) : base (userManager, roleManager, optionsAccesor)
    {

    }
  }
}
