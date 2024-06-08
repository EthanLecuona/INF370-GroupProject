using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Fuel_Price")]
    public partial class FuelPrice
    {
        [Key]
        [Column("FuelPrice_ID")]
        public int FuelPriceId { get; set; }
        [Column("DriverUser_ID")]
        [Unicode(false)]
        public string DriverUserId { get; set; } = null!;
        public double Litres { get; set; }
        public double Price { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? TimeStamp { get; set; }
        [Column("FuelSlip")]
        public string FuelSlip { get; set; }

    }
}
