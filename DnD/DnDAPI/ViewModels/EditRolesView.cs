using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DnDApi.ViewModels
{
  public class EditRolesView
  {
    public EditRolesView()
    {
      Users = new List<string>();
    }
    public string RoleId { get; set; }
    [Required]
    public string RoleName { get; set; }
    public List<string> Users { get; set; }
  }
}
