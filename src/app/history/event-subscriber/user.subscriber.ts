import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from "typeorm";
import { Users } from "../../modules/auth/entities/user.entity";
import { UsersHistory } from "../history-entities";
//import { CompanyHistory } from "../history-entities";
//import { Contact } from "../../modules/contacts/entities/contact.entity";

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<Users> {
  /**
   * Specifies that this subscriber only listens to Company events.
   */
  listenTo() {
    return Users;
  }

  /**
   * Before a Company entity is updated, capture its current state and insert it into the CompanyHistory table.
   *
   * @param event - The update event triggered by TypeORM.
   */
  async beforeUpdate(event: UpdateEvent<Users>): Promise<void> {
    // Ensure we have the entity data. If it is not loaded, skip history recording.
    if (event.entity) {
      let history = new UsersHistory();
      history.recordId=event.entity.id;
      history.code = event.entity.code;
      history.name = event.entity.name;
      history.userName = event.entity.userName;
      history.password = event.entity.password;
      history.userTypeId = event.entity.userTypeId;
      history.companyId = event.entity.companyId;
      history.birthDate = event.entity.birthDate;
      history.mobile = event.entity.mobile;
      history.email = event.entity.email;
      history.isInactive = event.entity.isInactive;
      history.createdDate = event.entity.createdDate;
      history.modifiedDate = event.entity.modifiedDate;

    
      

      // Insert the history record into the database.

      // Copy any additional fields from the Company entity as needed.

      // Use event.manager to insert the history record within the same transaction.
      // This ensures that the history record will only be created if the update succeeds.
      await event.manager.insert(UsersHistory, history);
    }
  }
}
