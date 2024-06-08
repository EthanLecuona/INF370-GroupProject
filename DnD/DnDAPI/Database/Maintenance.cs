using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Maintenance")]
    public partial class Maintenance
    {
        [Key]
        [Column("Maintenance_ID")]
        public int MaintenanceId { get; set; }
        //[Column("RecordedKM")]
        //public double? RecordedKm { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Date { get; set; }
        [Column("Registration_ID")]
        public int RegistrationId { get; set; }
        [Column("Mechanic_ID")]
        public int MechanicId { get; set; }
        public bool Confirmed { get; set; }

        [ForeignKey("MechanicId")]
        [InverseProperty("Maintenances")]
        public virtual Mechanic Mechanic { get; set; } 
        [ForeignKey("RegistrationId")]
        [InverseProperty("Maintenances")]
        public virtual Vehicle Registration { get; set; } 
    }
}
