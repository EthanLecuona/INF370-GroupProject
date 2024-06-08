using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DnDApi.ViewModels
{
  public class PreInspectionView
  {
    public string DriverUserId { get; set; }
    public DateTime StartDate { get; set; }
    public string PreCarInspection { get; set; }
    public int PreCarOdometer { get; set; }
    public bool PreCarTyres { get; set; }
    public string PreCarNotes { get; set; }
  }
}
