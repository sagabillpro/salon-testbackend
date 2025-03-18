import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from "typeorm";
//import { CompanyHistory } from "../history-entities";
//import { Contact } from "../../modules/contacts/entities/contact.entity";
import { Services } from "../../modules/services/entities/services.entity";
import { ServicesHistory } from "../history-entities";
//import { ContactHistory } from "../history-entities/contact-history.entity";

@EventSubscriber()
export class ServicesSubscriber implements EntitySubscriberInterface<Services> {
  /**
   * Specifies that this subscriber only listens to Company events.
   */
  listenTo() {
    return Services;
  }

  /**
   * Before a Company entity is updated, capture its current state and insert it into the CompanyHistory table.
   *
   * @param event - The update event triggered by TypeORM.
   */
  async beforeUpdate(event: UpdateEvent<Services>): Promise<void> {
    // Ensure we have the entity data. If it is not loaded, skip history recording.
    if (event.entity) {
      let history = new ServicesHistory();
      history.recordId = event.entity.id;
      history.amount = event.entity.amount;
      history.taxAmount = event.entity.taxAmount;
      history.code = event.entity.code;
      history.name = event.entity.name;
      history.companyId = event.entity.companyId;
      history.taxId = event.entity.taxId;
      history.itemTypeId = event.entity.itemTypeId;
      history.inStockId = event.entity.inStockId;
      history.taxAmount = event.entity.taxAmount;
      history.amount = event.entity.amount;
      history.isInactive = event.entity.isInactive;
      history.isService = event.entity.isService;
      history.createdDate = event.entity.createdDate;
      history.modifiedDate = event.entity.modifiedDate;
      history.description = event.entity.description;
      history.discount = event.entity.discount;
      history.category = event.entity.category;
      history.tags = event.entity.tags;
      history.brand = event.entity.brand;
      history.imageUrls = event.entity.imageUrls;
      history.isFeatured = event.entity.isFeatured;
      history.sku = event.entity.sku;
      history.costPrice = event.entity.costPrice;
      history.rating = event.entity.rating;
      history.createdBy = event.entity.createdBy;
      history.modifiedBy = event.entity.modifiedBy;
      history.deletedAt = event.entity.deletedAt;
      history.version = event.entity.version;

      // Insert the history record into the database.

      // Copy any additional fields from the Company entity as needed.

      // Use event.manager to insert the history record within the same transaction.
      // This ensures that the history record will only be created if the update succeeds.
      await event.manager.insert(ServicesHistory, history);
    }
  }
}
