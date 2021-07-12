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
                />
            </Grid>
            <Grid item xs={4}>
                <CountrySelect prefix={props.prefix} />
            </Grid>
        </Grid>
    );
}

export default function ProfileEditor() {
    const classes = useStyles();

    const { t } = useTranslation();

    var [separateBillingAddress, setSeparateBillingAddress] = useState(false);

    const submitUpdates = async () => {
        const res = await api.patch('/user/metadata');
        console.log(res);
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
                <form className={classes.form} noValidate>
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
                        <Address prefix="residenceAddress" />
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
                                    setSeparateBillingAddress(
                                        !separateBillingAddress
                                    );
                                }}
                            />
                        </Grid>
                        {separateBillingAddress && (
                            <>
                                <Grid item xs={12}>
                                    <Typography component="h4" variant="h5">
                                        <Trans i18nKey="profile.fields.billingAddressString">
                                            Billing Address
                                        </Trans>
                                    </Typography>
                                </Grid>
                                <Address prefix="billingAddress" />
                            </>
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
