import React, { useEffect } from 'react';

const Grid = ({ business }) => {
	return (
		<ul>
			{business.map((b) => (
				<li>
					<div>{b.businessName}</div>
					<div>Reports: {b.reports.length}</div>
				</li>
			))}
		</ul>
	);
};

export default Grid;
