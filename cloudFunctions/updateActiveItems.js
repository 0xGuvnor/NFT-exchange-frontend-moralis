Moralis.Cloud.afterSave("ItemListed", async (request) => {
	const confirmed = request.object.get("confirmed");
	const logger = Moralis.Cloud.getLogger();
	logger.info("Looking for confirmed tx...");

	if (confirmed) {
		logger.info("Found Item!");
		const ActiveItem = Moralis.Object.extend("ActiveItem");

		const query = new Moralis.Query(ActiveItem);
		query.equalTo("nftAddr", request.object.get("nftAddr"));
		query.equalTo("tokenId", request.object.get("tokenId"));
		query.equalTo("exchangeAddress", request.object.get("address"));
		query.equalTo("seller", request.object.get("seller"));
		const alreadyListed = await query.first();
		if (alreadyListed) {
			logger.info(`Deleting already listed ${request.object.get("objectId")}`);
			await alreadyListed.destroy();
			logger.info(
				`Deleted item with tokenId ${request.object.get(
					"tokenId)"
				)} at address ${request.object.get("address")} since it's already been listed`
			);
		}

		const activeItem = new ActiveItem();
		activeItem.set("exchangeAddress", request.object.get("address"));
		activeItem.set("nftAddr", request.object.get("nftAddr"));
		activeItem.set("price", request.object.get("price"));
		activeItem.set("tokenId", request.object.get("tokenId"));
		activeItem.set("seller", request.object.get("seller"));
		logger.info(
			`Adding Address: ${request.object.get("address")}; TokenId: ${request.object.get(
				"tokenId"
			)}`
		);
		logger.info("Saving...");
		await activeItem.save();
	}
});

Moralis.Cloud.afterSave("ListingCancelled", async (request) => {
	const confirmed = request.object.get("confirmed");
	const logger = Moralis.Cloud.getLogger();
	logger.info(`Exchange | Object: ${request.object}`);

	if (confirmed) {
		const ActiveItem = Moralis.Object.extend("ActiveItem");
		const query = new Moralis.Query(ActiveItem);
		query.equalTo("exchangeAddress", request.object.get("address"));
		query.equalTo("nftAddr", request.object.get("nftAddr"));
		query.equalTo("tokenId", request.object.get("tokenId"));
		logger.info(`Exchange | Query: ${query}`);

		const cancelledItem = await query.first();
		logger.info(`Exchange | CancelledItem: ${cancelledItem}`);
		if (cancelledItem) {
			logger.info(
				`Deleting Token #${request.object.get("tokenId")} at address ${request.object.get(
					"address"
				)} since it was cancelled`
			);
			await cancelledItem.destroy();
		} else {
			logger.info(
				`No item found with address ${request.object.get(
					"address"
				)} and tokenId: ${request.object.get("tokenId")}`
			);
		}
	}
});

Moralis.Cloud.afterSave("ItemBought", async (request) => {
	const confirmed = request.object.get("confirmed");
	const logger = Moralis.Cloud.getLogger();
	logger.info(`Exchange | Object: ${request.object}`);

	if (confirmed) {
		const ActiveItem = Moralis.Object.extend("ActiveItem");
		const query = new Moralis.Query(ActiveItem);
		query.equalTo("exchangeAddress", request.object.get("address"));
		query.equalTo("nftAddr", request.object.get("nftAddr"));
		query.equalTo("tokenId", request.object.get("tokenId"));
		logger.info(`Exchange | Query: ${query}`);

		const boughtItem = await query.first();
		if (boughtItem) {
			logger.info(`Deleting ${request.object.get("objectId")}`);
			await boughtItem.destroy();
			logger.info(
				`Deleted listing with Token ID ${request.object.get(
					"tokenId"
				)} at address ${request.object.get("address")}`
			);
		} else {
			logger.info(
				`No item found with address: ${request.object.get(
					"address"
				)} and tokenId: ${request.object.get("tokenId")}`
			);
		}
	}
});
