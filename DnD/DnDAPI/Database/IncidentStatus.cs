using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Incident_Status")]
    public partial class IncidentStatus
    {
        public IncidentStatus()
        {
            Incidents = new HashSet<Incident>();
        }

        [Key]
        [Column("IncidentStatus_ID")]
        public int IncidentStatusId { get; set; }
        public bool? Status { get; set; }

        [InverseProperty("IncidentStatus")]
        public virtual ICollection<Incident> Incidents { get; set; }
    }
}
