using System;

namespace DnDApi.ViewModels
{
  public class LicenseView
  {
    public int LicenseCodeId { get; set; }
    public string Description { get; set; }
    public string LicenseNumber { get; set; }
    public DateTime ExpirationDate { get; set; }
  }
}
