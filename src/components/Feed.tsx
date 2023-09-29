import React from 'react'
import { ReportLostItem } from './item/ReportLostItem';

export const Feed: React.FC = ({ }) => {
	return (
		<div>
			<ReportLostItem />

			<div className="flex justify-center pt-5">
				this is the main feed
			</div>
		</div>
	);
}
