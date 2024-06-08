using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Vehicle_Model")]
    public partial class VehicleModel
    {
        public VehicleModel()
        {
            Vehicles = new HashSet<Vehicle>();
        }

        [Key]
        [Column("Model_ID")]
        public int ModelId { get; set; }
        [Column("Manufacturer_ID")]
        public int ManufacturerId { get; set; }
        [Column("Model_Code")]
        [StringLength(50)]
        [Unicode(false)]
        public string ModelCode { get; set; }
        [Column("Model_Title")]
        [StringLength(50)]
        [Unicode(false)]
        public string ModelTitle { get; set; }

        [ForeignKey("ManufacturerId")]
        [InverseProperty("VehicleModels")]
        public virtual VehicleManufacturer Manufacturer { get; set; } 
        [InverseProperty("Model")]
        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
