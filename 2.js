coll = db.accidents;

coll.aggregate(  
	{ $group: {_id: "$Local_Authority_(District)", max_speed_limit: {$max : "$Speed_limit"}}},
	{ $match: {max_speed_limit: {$lte: 50}}}  
);

coll.distinct("Local_Authority_(District)").length;

coll.aggregate( 
 	{ $group: {_id: "$Date", total_casualties: {$sum : "$Number_of_Casualties"}}},
 	{ $match: {total_casualties: {$gte: 1000}}}
);

coll.aggregate( 
	{ 
		$group: {_id: "$Road_Type", count: {$sum: 1}, total_casualties: {$sum: "$Number_of_Casualties"}},
	},
	{
		$project: {_id: 1, ratio: {$divide: ["$total_casualties", "$count"]}}
	}
);

coll.aggregate(
	{
		$group: {_id: "$Day_of_Week", count: {$sum: 1}}	
	},
	{
		$sort: {count: -1}
	}
);