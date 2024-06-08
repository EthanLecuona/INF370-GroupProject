using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("AuditLogType")]
    public partial class AuditLogType
    {
        public AuditLogType()
        {
            AuditLogs = new HashSet<AuditLog>();
        }

        [Key]
        [Column("AuditLogType_ID")]
        public int AuditLogTypeId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Description { get; set; } 

        [InverseProperty("AuditLogType")]
        public virtual ICollection<AuditLog> AuditLogs { get; set; }
    }
}
