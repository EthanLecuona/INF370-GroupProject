using System.ComponentModel.DataAnnotations;

namespace DnDApi.ViewModels
{
  public class RolesViewModel
  {
    [Required]
    public string RoleName { get; set; }
  }
}
