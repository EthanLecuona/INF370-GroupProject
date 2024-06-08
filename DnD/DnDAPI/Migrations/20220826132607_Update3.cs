using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDApi.Migrations
{
  public partial class Update3 : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AlterColumn<string>(
        name: "DriverUser_ID",
        table: "Inspection",
        type: "varchar(900)",
        unicode: false,
        nullable: false,
        defaultValue: "",
        oldClrType: typeof(string),
        oldType: "varchar(max)",
        oldUnicode: false,
        oldNullable: true);

      migrationBuilder.AddForeignKey(
        name: "FK_Inspection_Driver_Information_DriverUser_ID",
        table: "Inspection",
        column: "DriverUser_ID",
        principalTable: "Driver_Information",
        principalColumn: "DriverUser_ID");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropIndex(
        name: "IX_Inspection_DriverUser_ID",
        table: "Inspection");

      migrationBuilder.DropColumn(
        name: "DriverUser_ID",
        table: "Inspection");
    }
  }
}
