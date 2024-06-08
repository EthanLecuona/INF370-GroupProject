using System;

namespace DnDApi.ViewModels
{
  public class FuelPriceView
  {
    public string DriverUser_ID { get; set; }
    public float Liters { get; set; }
    public float Price { get; set; }
    public DateTime TimeStamp { get; set; }
    public string FuelSlip { get; set; }

    //public bool? TyrePressure { get; set; }
  }
}
