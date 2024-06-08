using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDApi.Migrations
{
    public partial class Update13 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ResolveMethod",
                table: "Incident",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResolveMethod",
                table: "Incident");
        }
    }
}
