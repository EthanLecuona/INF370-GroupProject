using Microsoft.AspNetCore.Identity;


namespace DnDApi.ViewModels
{
  public class AppUser : IdentityUser
  {
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Profile_Picture { get; set; }
    public bool Deactivated { get; set; }

  }
}
