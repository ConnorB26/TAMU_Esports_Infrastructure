import { Module } from "@nestjs/common";
import { ReservationAuthModule } from "./reservationAuth.module";
import { ReservationModule } from "./reservation.module";
import { FacilityModule } from "./facility.module";
import { FacilityGameModule } from "./facilityGame.module";
import { GameModule } from "./game.module";
import { ComputerModule } from "./computer.module";
import { ReservationComputerModule } from "./reservationComputer.module";
import { ReservationParticipantModule } from "./reservationParticipant.module";
import { ReservationUserModule } from "./reservationUser.module";

@Module({
    imports: [
      ReservationAuthModule,
      ReservationModule,
      FacilityModule,
      FacilityGameModule,
      GameModule,
      ComputerModule,
      ReservationComputerModule,
      ReservationParticipantModule,
      ReservationUserModule,
    ],
    exports: []
  })
  export class ReservationCollectiveModule {}
  