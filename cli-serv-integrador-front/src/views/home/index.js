import React, { useEffect, useState } from 'react';
import {
	HomeContainer,
	HomeContent,
	Grid,
	GridHeader,
	Filter,
	FilterElement,
	FilterInput,
	FilterLabel,
	FilterButton,
	ClearButton,
} from './styles';
import { getBusiness } from '../../api/business';

const Home = () => {
	const [business, setBusiness] = useState([]);
	const [allBusiness, setAllBusiness] = useState([]);
	const [filters, setFilters] = useState({ cuit: '', year: '', month: '' });

	useEffect(() => {
		getBusiness().then((data) => {
			if (data) {
				setAllBusiness(data.data);
				setBusiness(data.data);
			}
		});
	}, []);

	const getState = (b) => {
		const { reports = [] } = b;
		const date = new Date();
		const currentYear = date.getFullYear().toString();
		const currentMonth = (date.getMonth() + 1).toString();
		const report = reports.find(
			({ period: { year, month } }) =>
				year === currentYear &&
				(month === currentMonth || month === `0${currentMonth}`)
		);
		return report;
	};

	const formatDate = (d = new Date()) => {
		const options = { year: 'numeric', month: 'short' };
		const date = new Date(d);
		return date.toLocaleDateString('en-US', options);
	};

	const onFilterChange = ({ target }) => {
		const key = target.name;
		const value = target.value;
		setFilters({ ...filters, [key]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const filteredBusiness = () =>
			business.filter((b) => b.cuit === filters.cuit);
		setBusiness(filteredBusiness);
	};

	const onResetFilters = () => {
		setFilters({ cuit: '', year: '', month: '' });
		setBusiness(allBusiness);
	};

	return (
		<HomeContainer>
			<HomeContent>
				<Filter>
					<FilterElement>
						<FilterLabel>Nº CUIT</FilterLabel>
						<FilterInput
							name='cuit'
							type='number'
							required
							onChange={onFilterChange}
							value={filters.cuit}
						/>
					</FilterElement>
					<FilterElement>
						<FilterLabel>Año</FilterLabel>
						<FilterInput
							name='year'
							type='number'
							placeholder='opcional..'
							onChange={onFilterChange}
							value={filters.year}
						/>
					</FilterElement>
					<FilterElement>
						<FilterLabel>Mes</FilterLabel>
						<FilterInput
							name='year'
							type='number'
							placeholder='opcional..'
							onChange={onFilterChange}
							value={filters.month}
						/>
					</FilterElement>
					<FilterButton type='submit' onClick={onSubmit} onSubmit={onSubmit}>
						Buscar
					</FilterButton>
				</Filter>
				<ClearButton onClick={onResetFilters}>Limpiar Filtros</ClearButton>
				<GridHeader>
					<div>Cliente</div>
					<div>CUIT</div>
					<div>Periodo</div>
					<div>Estado</div>
					<div>Operaciones</div>
				</GridHeader>
				<Grid>
					{business.map((b) => (
						<>
							<div>{b.businessName}</div>
							<div>{b.cuit}</div>
							<div>{formatDate()}</div>
							<div className={getState(b) ? 'ok' : 'no-ok'}>
								{getState(b) ? 'Ok' : 'Pendiente'}
							</div>
							<a href='#' className='details'>
								Detalles..
							</a>
						</>
					))}
				</Grid>
			</HomeContent>
		</HomeContainer>
	);
};

export default Home;
