using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    public partial class Settings
    {
        [Key]
        [Column("Settings_ID")]
        public int SettingsId { get; set; }
        public int LogoutTimer { get; set; }
    }
}
