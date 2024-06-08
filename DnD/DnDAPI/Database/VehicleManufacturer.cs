using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Vehicle_Manufacturer")]
    public partial class VehicleManufacturer
    {
        public VehicleManufacturer()
        {
            VehicleModels = new HashSet<VehicleModel>();
            Vehicles = new HashSet<Vehicle>();
        }

        [Key]
        [Column("Manufacturer_ID")]
        public int ManufacturerId { get; set; }
        [Column("Manufacturer_Code")]
        [StringLength(50)]
        [Unicode(false)]
        public string ManufacturerCode { get; set; }
        [Column("Manufacturer_Title")]
        [StringLength(50)]
        [Unicode(false)]
        public string ManufacturerTitle { get; set; }

        [InverseProperty("Manufacturer")]
        public virtual ICollection<VehicleModel> VehicleModels { get; set; }
        [InverseProperty("Manufacturer")]
        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
