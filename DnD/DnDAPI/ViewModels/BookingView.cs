using System;

namespace DnDApi.ViewModels
{
  public class BookingView
  {
    public string Qrcode { get; set; }
    public int ParcelConId { get; set; }
    public int ParcelPriorityId { get; set; }
    public int ParcelTypeId { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public int CecId { get; set; }
    public string SenderId { get; set; }
    public float Distance { get; set; }
    public string StartLocation { get; set; }
    public string EndLocation { get; set; }
  }
}
