using System;

namespace DnDApi.ViewModels
{
  public class CancellationView
  {
    public int BookingId { get; set; }
    public DateTime CancelledDate { get; set; }
    public string CancelledDescription { get; set; }
  }
}
