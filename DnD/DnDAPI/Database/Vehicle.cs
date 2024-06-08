using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Vehicle")]
    public partial class Vehicle
    {
        public Vehicle()
        {
            Maintenances = new HashSet<Maintenance>();
        }

        [Key]
        [Column("Registration_ID")]
        public int RegistrationId { get; set; }
        [Column("VehicleClass_ID")]
        public int VehicleClassId { get; set; }
        [Column("Manufacturer_ID")]
        public int ManufacturerId { get; set; }
        [Column("Model_ID")]
        public int ModelId { get; set; }
        [Required]
        public bool Activated { get; set; }
        [Required]
        public bool Availability { get; set; }
        [Column("Manufactured_Date")]
        public string ManufacturedDate { get; set; }
        public string RegistrationNumber { get; set; }

        [ForeignKey("ManufacturerId")]
        [InverseProperty("Vehicles")]
        public virtual VehicleManufacturer Manufacturer { get; set; } 
        [ForeignKey("ModelId")]
        [InverseProperty("Vehicles")]
        public virtual VehicleModel Model { get; set; } 
        [ForeignKey("VehicleClassId")]
        [InverseProperty("Vehicles")]
        public virtual VehicleClass VehicleClass { get; set; } 
        [InverseProperty("Registration")]
        public virtual ICollection<Maintenance> Maintenances { get; set; }
    }
}
