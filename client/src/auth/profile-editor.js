import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Trans, useTranslation } from 'react-i18next';
import CountrySelect from '../main/util/country-select.js';
import PhoneField from '../main/util/phone-field.js';
import api from '../api.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Address(props) {
    const { t } = useTranslation();

    const [address, setAddress] = useState({
        street: '',
        number: null,
        postalCode: null,
        city: '',
        province: '',
        country: '',
    });

    const onChange = props.onChange;

    const updateAddress = (addr) => {
        setAddress(addr);
        onChange(addr);
    };

    const streetId = props.prefix + 'Street';
    const numberId = props.prefix + 'Number';
    const postalCodeId = props.prefix + 'PostalCode';
    const cityId = props.prefix + 'City';
    const provinceId = props.prefix + 'Province';

    return (
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label={t('profile.fields.address.street', 'Street')}
                    name={streetId}
                    id={streetId}
                    onChange={function (event) {
                        updateAddress({
                            ...address,
                            street: event.target.value,
                        });
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label={t('profile.fields.address.number', 'Number')}
                    name={numberId}
                    id={numberId}
                    onChange={function (event) {
                        updateAddress({
                            ...address,
                            number: event.target.value,
                        });
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label={t(
                        'profile.fields.address.postalCode',
                        'Postal Code'
                    )}
                    name={postalCodeId}
                    id={postalCodeId}
                    onChange={function (event) {
                        updateAddress({
                            ...address,
                            postalCode: event.target.value,
                        });
                    }}
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label={t('profile.fields.address.city', 'City')}
                    name={cityId}
                    id={cityId}
                    onChange={function (event) {
                        updateAddress({ ...address, city: event.target.value });
                    }}
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label={t('profile.fields.address.province', 'Province')}
                    name={provinceId}
                    id={provinceId}
                    onChange={function (event) {
                        updateAddress({
                            ...address,
                            province: event.target.value,
                        });
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <CountrySelect
                    prefix={props.prefix}
                    onChange={function (event, value) {
                        updateAddress({
                            ...address,
                            country: value != null ? value.code : null,
                        });
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default function ProfileEditor() {
    const classes = useStyles();

    const { t } = useTranslation();

    var [formData, setFormData] = useState({
        firstName: '',
        middleNames: '',
        lastName: '',
        email: '',
        allowExtraEmails: false,
        residenceAddress: {},
        separateBillingAddress: false,
        billingAddress: {},
    });

    const submitUpdates = () => {
        api.post('/secure/user/validate-metadata', formData)
            .then((res) => {
                api.post('/secure/user/metadata', formData);
            })
            .catch((error) => {
                // TODO: handle error display
            });
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <Trans i18nKey="profile.editData">
                        Edit profile details
                    </Trans>
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label={t(
                                    'profile.fields.firstName',
                                    'First Name'
                                )}
                                autoFocus
                                onChange={function (event) {
                                    setFormData({
                                        ...formData,
                                        firstName: event.target.value,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="middleNames"
                                label={t(
                                    'profile.fields.middleNames',
                                    'Middle Names'
                                )}
                                name="middleNames"
                                onChange={function (event) {
                                    setFormData({
                                        ...formData,
                                        middleNames: event.target.value,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label={t(
                                    'profile.fields.lastName',
                                    'Last Name'
                                )}
                                name="lastName"
                                autoComplete="lname"
                                onChange={function (event) {
                                    setFormData({
                                        ...formData,
                                        lastName: event.target.value,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label={t(
                                    'profile.fields.email',
                                    'Email Address'
                                )}
                                name="email"
                                autoComplete="email"
                                onChange={function (event) {
                                    setFormData({
                                        ...formData,
                                        email: event.target.value,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PhoneField variant="outlined" classes={classes} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                        onChange={function (event) {
                                            console.log(event);
                                            setFormData({
                                                ...formData,
                                                allowExtraEmails:
                                                    event.target.checked,
                                            });
                                        }}
                                    />
                                }
                                label={t(
                                    'profile.fields.marketingEmails',
                                    'I wish to receive news, marketing promotions and updates via email.'
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h4" variant="h5">
                                <Trans i18nKey="profile.fields.residenceAddressString">
                                    Residence Address
                                </Trans>
                            </Typography>
                        </Grid>
                        <Address
                            prefix="residenceAddress"
                            onChange={function (addr) {
                                setFormData({
                                    ...formData,
                                    residenceAddress: addr,
                                });
                            }}
                        />
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="separateBillingAddress"
                                        color="primary"
                                    />
                                }
                                label={t(
                                    'profile.fields.separateBillingAddress',
                                    'Billing address differs from residence address'
                                )}
                                onChange={function (event) {
                                    setFormData({
                                        ...formData,
                                        separateBillingAddress:
                                            !formData.separateBillingAddress,
                                    });
                                }}
                            />
                        </Grid>
                        {formData.separateBillingAddress && (
                            <React.Fragment>
                                <Grid item xs={12}>
                                    <Typography component="h4" variant="h5">
                                        <Trans i18nKey="profile.fields.billingAddressString">
                                            Billing Address
                                        </Trans>
                                    </Typography>
                                </Grid>
                                <Address
                                    prefix="billingAddress"
                                    onChange={function (addr) {
                                        setFormData({
                                            ...formData,
                                            billingAddress: addr,
                                        });
                                    }}
                                />
                            </React.Fragment>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitUpdates}
                    >
                        <Trans i18nKey="profile.save">Save</Trans>
                    </Button>
                </form>
            </div>
        </Container>
    );
}
