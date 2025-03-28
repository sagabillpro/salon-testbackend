import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from "typeorm";
//import { CompanyHistory } from "../history-entities";
import { Contact } from "../../modules/contacts/entities/contact.entity";
import { ContactHistory } from "../history-entities/contact-history.entity";

@EventSubscriber()
export class ContactSubscriber implements EntitySubscriberInterface<Contact> {
  /**
   * Specifies that this subscriber only listens to Company events.
   */
  listenTo() {
    return Contact;
  }

  /**
   * Before a Company entity is updated, capture its current state and insert it into the CompanyHistory table.
   *
   * @param event - The update event triggered by TypeORM.
   */
  async beforeUpdate(event: UpdateEvent<Contact>): Promise<void> {
    // Ensure we have the entity data. If it is not loaded, skip history recording.
    if (event.entity) {
      let history = new ContactHistory();
      history.recordId = event.entity.id;
      history.code = event.entity.code;
      history.name = event.entity.name;
      history.companyId = event.entity.companyId;
      history.birthDate = event.entity.birthDate;
      history.mobile = event.entity.mobile;
      history.email = event.entity.email;
      history.address = event.entity.address;
      history.zipCode = event.entity.zipCode;
      history.isInactive = event.entity.isInactive;
      history.lastVisitedDate = event.entity.lastVisitedDate;
      history.createdDate = event.entity.createdDate;
      history.modifiedDate = event.entity.modifiedDate;
      history.version = event.entity.version;
      history.modifiedById = event.databaseEntity.modifiedById;

      // Copy any additional fields from the Company entity as needed.

      // Use event.manager to insert the history record within the same transaction.
      // This ensures that the history record will only be created if the update succeeds.
      await event.manager.insert(ContactHistory, history);
    }
  }
}
