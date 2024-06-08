using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Vehicle_Class")]
    public partial class VehicleClass
    {
        public VehicleClass()
        {
            Vehicles = new HashSet<Vehicle>();
        }

        [Key]
        [Column("VehicleClass_ID")]
        public int VehicleClassId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Description { get; set; }

        [InverseProperty("VehicleClass")]
        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
