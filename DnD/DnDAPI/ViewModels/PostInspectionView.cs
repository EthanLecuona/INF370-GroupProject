using System;

namespace DnDApi.ViewModels
{
  public class PostInspectionView
  {
    public string DriverUserId { get; set; }
    public DateTime EndDate { get; set; }
    public string PostCarInspection { get; set; }
    public int PostCarOdometer { get; set; }
    public bool PostCarTyres { get; set; }
    public string PostCarNotes { get; set; }
  }
}
