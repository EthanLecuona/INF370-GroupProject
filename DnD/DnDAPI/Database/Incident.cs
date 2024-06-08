using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Incident")]
    public partial class Incident
    {
        [Key]
        [Column("Incident_ID")]
        public int IncidentId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Location { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Date { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Description { get; set; }
        [Column("IncidentStatus_ID")]
        public int IncidentStatusId { get; set; }
        [Column("DriverUser_ID")]
        [Unicode(false)]
        public string DriverUserId { get; set; } 

        [ForeignKey("IncidentStatusId")]
        [InverseProperty("Incidents")]
        public virtual IncidentStatus IncidentStatus { get; set; }

      public string ResolveMethod { get; set; }
    }
}
