using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("AuditLog")]
    public partial class AuditLog
    {
        [Key]
        [Column("Log_ID")]
        public int LogId { get; set; }
        [Column("User_ID")]
        [Unicode(false)]
        public string UserId { get; set; } 
        [Column("AuditLogType_ID")]
        public int AuditLogTypeId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime TimeStamp { get; set; }

        [ForeignKey("AuditLogTypeId")]
        [InverseProperty("AuditLogs")]
        public virtual AuditLogType AuditLogType { get; set; } 
    }
}
