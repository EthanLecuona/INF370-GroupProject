using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
  [Table("Driver_Location")]
  public partial class DriverLocation
  {
    [Key]
    [Column("Location_ID")]
    public int LocationId { get; set; }
    [Column("Latitude")]
    public float Lat { get; set; }
    [Column("Longitude")]
    public float Lng { get; set; }

  }
}
